import { generateToken } from "../authentication";
import { User } from "../entity/User";
const argon2 = require("argon2");

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

    //TODO: validate phone number

    const hashedPassword = await argon2.hash(data.password);

    const newUser = await User.create({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      phone_number: data.phone_number ? data.phone_number : "",
      first_name: data.first_name,
      last_name: data.last_name,
    });

    newUser.save();

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
    res.status(404).json({ status: "INCORRECT_CREDENTIALS" });
    return;
  }

  const valid = await argon2.verify(user.password, data.password);

  if (!valid) {
    res.status(404).json({ status: "INCORRECT_CREDENTIALS" });
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
