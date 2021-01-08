import { authenticateToken, authenticateTokenGet } from "../../authentication";
import * as chatController from "../../controllers/chatController";

const express = require("express");
const router = express.Router();

router.get("/", authenticateTokenGet, chatController.chat_list);
router.get("/notifications", authenticateTokenGet, chatController.chat_notifications);
router.get("/:id", authenticateTokenGet, chatController.chat_full);
router.get("/:id/update", authenticateTokenGet, chatController.chat_update);
router.post("/:id/send", authenticateToken, chatController.chat_send);

export default router;
