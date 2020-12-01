import { authenticateToken } from "../../authentication";
import * as offerController from "../../controllers/offerController";

const express = require("express");
const router = express.Router();

router.get("/", offerController.list);
router.get("/:id", offerController.offer_details);
router.post("/create", authenticateToken, offerController.offer_create);
//router.get("/:id/edit", offerController.offer_edit);
router.get("/:id/delete", authenticateToken, offerController.offer_delete);
router.post("/:id/upload-photo", authenticateToken, offerController.upload_photo);

export default router;