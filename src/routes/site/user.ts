const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render('user_page');
});

export default router;