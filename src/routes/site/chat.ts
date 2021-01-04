import { authenticateTokenGet } from "../../authentication";
import { validateAndFindChatList } from "../../controllers/chatController";

const express = require("express");
const router = express.Router();

router.get("/:id", authenticateTokenGet, async (req, res) => {
  res.render("chat", { auth_data: req.auth_data });
});

router.get("/", authenticateTokenGet, async (req, res) => {
  const response = await validateAndFindChatList(req, res);
  res.render("chat_list.pug", {
    chats: response.chats,
    loggedUser: response.loggedUser,
    auth_data: req.auth_data,
  });
});

export default router;
