import { authenticateToken, authenticateTokenGet } from "../../authentication";
import * as offerController from "../../controllers/offerController";

const express = require("express");
const router = express.Router();

router.get("/", offerController.list);
router.get("/categories", offerController.categories);
router.get("/myoffers", authenticateTokenGet, offerController.user_offers);
router.get("/:id", offerController.offer_details);

router.post("/create", authenticateToken, offerController.offer_create);
router.post("/:id/edit", authenticateToken, offerController.offer_edit);
router.post("/:id/delete", authenticateToken, offerController.offer_delete);
router.post(
  "/:id/upload-photo",
  authenticateToken,
  offerController.upload_photo
);

export default router;
