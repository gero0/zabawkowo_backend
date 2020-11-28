import { Toy } from "../../entity/Toy";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const list_offers = await Toy.find({ where: { status: "Active"} });
  res.render("index", { list_offers });
});

router.get("/:id", async (req, res) => {
  const offer = await Toy.findOne(req.params.id);
  res.render("offer", { offer });
});

export default router;
