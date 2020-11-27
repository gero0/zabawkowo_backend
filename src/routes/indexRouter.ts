import { Toy } from "../entity/Toy";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const toy_list = await Toy.find();
  res.render("index", { toy_list });
});

export default router;
