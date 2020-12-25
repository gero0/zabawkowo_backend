import { authenticateTokenGet } from "../../authentication";
import { User } from "../../entity/User";

const express = require("express");
const router = express.Router();

router.get("/", authenticateTokenGet, async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
    relations: ["addresses"],
  });

  res.render('user_page', {user: loggedUser});
});

export default router;