import { createHash } from "crypto";
import { generateToken } from "../authentication";
import { Address } from "../entity/Address";
import { User } from "../entity/User";
const argon2 = require("argon2");

export const add_address = async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
    relations: ["addresses"],
  });

  if (!loggedUser) {
    res.status(404).json({ status: "ERR_USER_NOT_FOUND" });
    return;
  }

  try {
    const address = req.body;

    if (!address.city || address.city == "") {
      res.status(400).json({ status: "ERR_ADDRESS_CITY" });
      return;
    }

    if (!address.postal_code || address.postal_code == "") {
      res.status(400).json({ status: "ERR_ADDRESS_POSTAL" });
      return;
    }

    if (!address.street_address || address.street_address == "") {
      res.status(400).json({ status: "ERR_ADDRESS_STREET" });
      return;
    }

    const newAddress = (Address.create({
      ...address,
      user_id: loggedUser.id,
    }) as unknown) as Address;
    //had to cast to address because for some reason typescript
    //thought create returns an array
    console.log(newAddress);
    newAddress.save();

    res.status(200).json({ status: "OK" });
  } catch (err) {
    res.status(500).json({ status: "ERR_ADDING_ADDRESS" });
    return;
  }
};

export const me = async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
    relations: ["addresses"],
  });

  if (!loggedUser) {
    res.status(404).json({ status: "ERR_USER_NOT_FOUND" });
    return;
  }

  res.send(JSON.stringify(loggedUser));
};

export const get_user_basic = async (req, res, next) => {
  const user = await User.findOne(req.params.id, {
    select: ["username", "email", "creation_date", "phone_number"],
  });

  if (!user) {
    return res.status(400).json({ status: "User not found" });
  }

  res.send(JSON.stringify(user));
};

export const token_test = async (req, res) => {
  console.log(req.auth_data);
  res.json({ status: "OK" });
};

export const create_user = async (req, res, next) => {
  const data = req.body;

  try {
    if (!data.username || data.username.length < 4) {
      res.status(400).json({ status: "ERR_USERNAME_LENGTH" });
      return;
    }

    if (!data.password || data.password.length < 8) {
      res.status(400).json({ status: "ERR_PASSWD_LENGTH" });
      return;
    }

    if (!data.email || !data.email.includes("@")) {
      res.status(400).json({ status: "ERR_EMAIL" });
      return;
    }

    if (!data.first_name || data.first_name == "") {
      res.status(400).json({ status: "ERR_FIRST_NAME" });
      return;
    }

    if (!data.last_name || data.last_name == "") {
      res.status(400).json({ status: "ERR_LAST_NAME" });
      return;
    }

    let phoneNumber = data.phone_number ? data.phone_number : "";

    //Forgive me future me, for i had to use regex
    // ^ - must be beginning of string
    // $ - must be end of string
    // + one or more
    // () - blocks
    // \. - literal dot
    // [] - character from range
    // ? 0 or 1
    let re = new RegExp("^(\\+[0-9][0-9])?([0-9]){9}$");

    if (phoneNumber !== "" && !re.test(phoneNumber)) {
      res.status(400).json({ status: "ERR_PHONE_NUMBER" });
      return;
    }

    const hashedPassword = await argon2.hash(data.password);

    let searchUser = await User.find({where:{username: data.username}});

    if(searchUser.length !== 0){
      res.status(400).json({ status: "ERR_USERNAME_EXISTS" });
      return;
    }

    searchUser = await User.find({where:{email: data.email}});

    if(searchUser.length !== 0){
      res.status(400).json({ status: "ERR_EMAIL_EXISTS" });
      return;
    }

    const newUser = await User.create({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      phone_number: phoneNumber,
      first_name: data.first_name,
      last_name: data.last_name,
    });

    const result = await newUser.save();
    //For some reason we need to read the result for constraint violation error to be caught
    console.log(result);

    const access_token = generateToken(data.username);

    res.status(201).json({ status: "OK", token: access_token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "ERR_CREATING_USER" });
    return;
  }
};

export const login = async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ where: { email: data.email } });

  if (!user) {
    res.status(404).json({ status: "ERR_INCORRECT_CREDENTIALS" });
    return;
  }

  const valid = await argon2.verify(user.password, data.password);

  if (!valid) {
    res.status(404).json({ status: "ERR_INCORRECT_CREDENTIALS" });
    return;
  }

  const access_token = generateToken(user.username);

  res.status(201).json({ status: "OK", token: access_token });
};

export const delete_user = async (req, res) => {
  try {
    let user_to_remove = await User.findOne({
      where: { username: req.auth_data.username },
    });
    await User.remove(user_to_remove);
  } catch {
    res.status(401).json({ status: "User no longer exists" });
    return;
  }
  res.status(201).json({ status: "OK" });
};
