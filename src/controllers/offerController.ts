import { Toy } from "../entity/Toy";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { ToyType } from "../entity/ToyType";

export const getOffers = async (req) => {
  let query = await getConnection()
    .createQueryBuilder()
    .select("toy")
    .from(Toy, "toy")
    .leftJoinAndSelect("toy.types", "type")
    .where("1=1");
  // where 1=1 added so we don't have to check if where was already used
  // otherwise we would have to check in every condition if where was used before
  // because you must call where only once and then use andWhere in next conditions

  if (req.query.search_text) {
    query = query.andWhere(
      "toy.name LIKE :text OR toy.description LIKE :text",
      { text: "%" + req.query.search_text + "%" }
    );
  }

  if (req.query.min_price && parseFloat(req.query.min_price)) {
    query = query.andWhere("toy.price >= :minPrice", {
      minPrice: parseFloat(req.query.min_price),
    });
  }

  if (req.query.max_price && parseFloat(req.query.max_price)) {
    query = query.andWhere("toy.price <= :maxPrice", {
      maxPrice: parseFloat(req.query.max_price),
    });
  }

  if (req.query.categories) {
    const separatedNumbers = req.query.categories.split(";");
    let categories = [];

    separatedNumbers.forEach((n) => {
      if (parseInt(n)) {
        categories.push(parseInt(n));
      }
    });

    query = query.andWhere("type.id IN (:...categories)", { categories });
  }

  const offers = await query.getMany();

  return offers;
};

export const list = async (req, res, next) => {
  const offers = await getOffers(req);

  if (!offers) {
    res.status(200).json({});
    return;
  }

  res.status(200).json(offers);
};

export const offer_details = async (req, res) => {
  const offer = await getConnection().query(
    `
      SELECT toy.name, toy.description, toy.price, toy.photo, toy.age, toy.status,
      u.username AS seller_username, u.phone_number AS seller_phone
      FROM toy JOIN public.user u ON (toy."userIdId" = u.id)
      WHERE toy.id = $1;
    `,
    [req.params.id]
  );

  if (!offer) {
    res.status(404).json({ status: "OFFER_NOT_FOUND" });
    return;
  }

  res.status(200).json(offer);
};

export const offer_delete = async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
  });

  await Toy.delete({ id: req.params.id, user_id: loggedUser });

  res.sendStatus(200);
};

export const offer_create = async (req, res) => {
  try {
    const loggedUser = await User.findOne({
      where: { username: req.auth_data.username },
    });

    const data = req.body;

    if (!data.name || !data.description || !data.price) {
      res.status(400).json({ status: "ERR_REQUIRED_FIELD" });
      return;
    }

    //replace comma with dot
    let price = data.price.replace(",", ".");

    //Forgive me future me, for i had to use regex
    // ^ - must be beginning of string
    // $ - must be end of string
    // + one or more
    // () - blocks
    // \. - literal dot
    // [] - character from range
    // ? 0 or 1
    let re = new RegExp(`^([0-9])+(\.([0-9][0-9]))?$`);

    //test if this is a valid price
    if (!re.test(price)) {
      res.status(400).json({ status: "ERR_PRICE" });
      return;
    }

    //TODO: Test categories!

    let newOffer = await Toy.create({
      name: data.name,
      description: data.description,
      price: price,
      age: data.age ? data.age : null,
      status: "Active",
      types: data.types ? data.types : null,
      user_id: loggedUser,
    });

    newOffer = await newOffer.save();
    res.status(201).json({ status: "OK", offer_id: newOffer.id });
  } catch {
    res.status(500).json({ status: "ERR_ADDING_OFFER" });
    return;
  }
};

export const upload_photo = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      res.status(401).json({ status: "ERR_FILE_MISSING" });
      return;
    }

    const loggedUser = await User.findOne({
      where: { username: req.auth_data.username },
    });

    if (!loggedUser) {
      res.status(403).json({ status: "ERR_NOT_AUTHORIZED" });
      return;
    }

    const offer = await Toy.findOne({ id: req.params.id, user_id: loggedUser });

    if (!offer) {
      res.status(404).json({ status: "ERR_OFFER_NOT_FOUND" });
      return;
    }

    const photo = req.files.file;

    let extension = "";

    if (photo.mimetype === "image/png") {
      extension = ".png";
    } else if (photo.mimetype === "image/jpeg") {
      extension = ".jpg";
    } else if (photo.mimetype === "image/gif") {
      extension = ".gif";
    } else {
      throw new Error("Unsupported file format");
    }

    const path = "/images/products/offer_" + offer.id + extension;

    photo.mv("./src/static" + path);
    offer.photo = path;
    offer.save();
  } catch (err) {
    res.status(500).json({ status: "ERR_UPLOAD_FAILED" });
    return;
  }

  res.status(200).json({ status: "OK" });
};

export const categories = async (req, res) => {
  try {
    const categories = await ToyType.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ status: "ERR_FETCHING_CATEGORIES" });
  }
};
