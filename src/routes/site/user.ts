import { authenticateTokenGet } from "../../authentication";

const express = require("express");
const router = express.Router();

router.get("/", authenticateTokenGet, async (req, res) => {
  res.render('user_page');
});

export default router;