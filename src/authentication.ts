import { TOKEN_SECRET } from "./secret";
const jwt = require("jsonwebtoken");

export function generateToken(username) {
  return jwt.sign({username: username}, TOKEN_SECRET, { expiresIn: "30 days" });
}

export function authenticateToken(req, res, next) {

  const token = req.headers['authorization']

  if (token == null || token == "")
    return res.status(401).json({ status: "TOKEN_ERR" }); // if there isn't any token

  jwt.verify(
    token,
    TOKEN_SECRET as string,
    (err: any, data: any) => {
      if (err) console.log(err);
      if (err) return res.status(401).json({ status: "TOKEN_ERR" });
      req.auth_data = data;
      next(); // pass the execution off to whatever request the client intended
    }
  );
}
