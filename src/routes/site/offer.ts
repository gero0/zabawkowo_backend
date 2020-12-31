import { authenticateTokenGet, authenticateOptionalGet } from "../../authentication";
import { Toy } from "../../entity/Toy";
import { ToyType } from "../../entity/ToyType";
import { getOffers, getUserOffers } from "../../controllers/offerController";
import { User } from "../../entity/User";

const express = require("express");
const router = express.Router();

router.get("/", authenticateOptionalGet, async (req, res) => {
  res.render("index", {auth_data: req.auth_data});
});

router.get("/create", authenticateTokenGet, async (req, res) => {
  const categories = await ToyType.find();
  res.render("offer_form", { categories, auth_data: req.auth_data });
});

router.get("/myoffers", authenticateTokenGet, async (req, res) => {
  const list_offers = await getUserOffers(req);
  const list_sorted = list_offers.sort((a, b) => {
    return a.created_at > b.created_at ? -1 : 1;
  });

  res.render("my_offers", { list_offers: list_sorted, auth_data: req.auth_data });
});

router.get("/:id", authenticateOptionalGet, async (req, res) => {
  const offer = await Toy.findOne(req.params.id, {
    relations: ["user_id", "types"],
  });

  if (!offer) {
    res
      .status(404)
      .send("Nie znaleziono oferty! <a href='/'>Powrót do strony głównej</a>");
    return;
  }

  const categories = offer.types.map((category) => category.name);
  const user = offer.user_id;
  res.render("offer", { offer, user, categories, auth_data: req.auth_data });
});

router.get("/:id/edit", authenticateTokenGet, async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
  });
  const offer = await Toy.findOne({
    where: { id: req.params.id, user_id: loggedUser},
    relations: ["types"],
  });

  if (!offer) {
    res
      .status(404)
      .send("Nie znaleziono oferty! <a href='/'>Powrót do strony głównej</a>");
    return;
  }

  const categories = await ToyType.find();

  res.render("offer_edit", { offer, categories, auth_data: req.auth_data });
});

export default router;
