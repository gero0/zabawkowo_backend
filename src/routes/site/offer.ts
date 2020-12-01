import { Toy } from "../../entity/Toy";
import { ToyType } from "../../entity/ToyType";
import { User } from "../../entity/User";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const list_offers = await Toy.find({ where: { status: "Active"} });
  const list_sorted = list_offers.sort( (a, b) => { return (a.created_at > b.created_at) ? -1 : 1 });
  const categories = await ToyType.find();
  res.render("index", { list_offers: list_sorted, categories });
});

router.get("/:id", async (req, res) => {
  const offer = await Toy.findOne(req.params.id);
  const user = await User.findOne(offer.user_id);
  res.render("offer", { offer, user });
});

export default router;
