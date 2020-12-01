import { Toy } from "../entity/Toy";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const list = async (req, res, next) => {
  //TODO: implement some kid of pagination
  const offers = await Toy.find();

  if (!offers) {
    res.status(404).json({ status: "NO_OFFERS" });
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

    //TODO: VALIDATE PRICE!
    //TODO: Test categories!
    
    const newOffer = await Toy.create({
      name: data.name,
      description: data.description,
      price: data.price,
      age: data.age ? data.age : null,
      status: "Active",
      types: data.types ? data.types : null,
      user_id: loggedUser,
    });

    newOffer.save();
  } catch {
    res.status(500).json({ status: "ERR_ADDING_OFFER" });
    return;
  }
  res.status(201).json({ status: "OK" });
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

    const path = "/images/products/offer_" + offer.id + ".png";

    photo.mv("./src/static" + path);
    offer.photo = path;
    offer.save();
  } catch (err) {
    res.status(500).json({ status: "ERR_UPLOAD_FAILED" });
    return;
  }

  res.status(200).json({ status: "OK " });
};
