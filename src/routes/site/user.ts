import { authenticateTokenGet } from "../../authentication";
import { send_password_reset } from "../../controllers/userController";
import { User } from "../../entity/User";

const express = require("express");
const router = express.Router();

router.get("/", authenticateTokenGet, async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
    relations: ["addresses"],
  });

  res.render("user_page", { user: loggedUser });
});

router.get("/forgot-password", async (req, res) => {
  res.render("forgot_form");
});

router.get("/forgot-confirm", async (req, res) => {
  res.render("forgot_confirmed");
});

router.post("/forgot-password", async (req, res) => {
  send_password_reset(req);
  res.redirect("/user/forgot-confirm");
});

router.get("/change-password/:token", async (req, res) => {
  res.render("new_password_form");
});

export default router;
