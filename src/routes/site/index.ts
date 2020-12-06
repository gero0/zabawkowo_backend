const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.redirect("/offer");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

export default router;
