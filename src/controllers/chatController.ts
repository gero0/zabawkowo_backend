import { User } from "../entity/User";
import { getConnection } from "typeorm";
import { Chat } from "../entity/Chat";
import { Message } from "../entity/Message";

export const validateAndFindChat = async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
  });

  if (!loggedUser) {
    res.status(403).json({ status: "ERR_NOT_AUTHORIZED" });
    return;
  }

  const secondUser = await User.findOne({
    where: { id: req.params.id },
  });

  if (!secondUser) {
    res.status(403).json({ status: "ERR_NOT_AUTHORIZED" });
    return;
  }

  const query = await getConnection()
    .createQueryBuilder()
    .select("chat")
    .from(Chat, "chat")
    .leftJoinAndSelect("chat.messages", "message")
    .where(
      "(user_id_1 = :user_id_1 AND user_id_2 = :user_id_2) OR (user_id_1 = :user_id_2 AND user_id_2 = :user_id_1) ",
      {
        user_id_1: loggedUser.id,
        user_id_2: secondUser.id,
      }
    );

  const chat = await query.getOne();

  return { chat, loggedUser, secondUser };
};

export const validateAndFindChatList = async (req, res) => {
  const loggedUser = await User.findOne({
    where: { username: req.auth_data.username },
  });

  if (!loggedUser) {
    res.status(403).json({ status: "ERR_NOT_AUTHORIZED" });
    return;
  }

  const query = await getConnection()
    .createQueryBuilder()
    .select("chat")
    .from(Chat, "chat")
    .where("(chat.user_id_1 = :user_id_1 OR chat.user_id_2 = :user_id_1)", {
      user_id_1: loggedUser.id,
    });

  const chats = await query.getMany();

  let chatsWithAdditionalData = [];

  for (const chat of chats) {
    let otherUser;

    if (chat.user_id_1 == loggedUser.id) {
      otherUser = await User.findOne(chat.user_id_2);
    } else {
      otherUser = await User.findOne(chat.user_id_1);
    }

    chat["otherUsername"] = otherUser.username;

    const lastMessage = await Message.findOne({
      where: { chat_id: chat.id },
      order: {
        send_date: "DESC",
      },
    });

    if (lastMessage) {
      chat["lastMessage"] = lastMessage;
    } else {
      chat["lastMessage"] = null;
    }

    chatsWithAdditionalData.push(chat);
  }

  return { chats: chatsWithAdditionalData, loggedUser };
};

export const chat_list = async (req, res) => {
  const result = await validateAndFindChatList(req, res);
  res.status(200).json({ status: "OK", chats: result.chats });
};

export const chat_full = async (req, res) => {
  const result = await validateAndFindChat(req, res);
  let chat = result.chat;
  const loggedUser = result.loggedUser;
  const secondUser = result.secondUser;

  if (!chat) {
    if (loggedUser.id == secondUser.id) {
      res.status(404).json({ status: "ERR_CHAT_SELF" });
      return;
    }

    chat = await Chat.create({
      user_id_1: loggedUser.id,
      user_id_2: secondUser.id,
    }).save();
  }

  const my_data = { id: loggedUser.id, username: loggedUser.username };
  const recipient_data = { id: secondUser.id, username: secondUser.username };

  res.status(200).json({ status: "OK", chat, my_data, recipient_data });
};

export const chat_update = async (req, res) => {
  const result = await validateAndFindChat(req, res);
  const messages = result.chat.messages;

  const timestamp = new Date(req.query.timestamp);
  let newMessages = [];

  messages.forEach((message) => {
    const send_date = new Date(message.send_date);
    if (send_date.getTime() > timestamp.getTime()) {
      newMessages.push(message);
    }
  });

  res.status(200).json({ status: "OK", chat: { messages: newMessages } });
};

export const chat_send = async (req, res) => {
  const result = await validateAndFindChat(req, res);
  let chat = result.chat;
  const loggedUser = result.loggedUser;

  const data = req.body;

  if (!data.content || !data.timestamp) {
    res.status(400).json({ status: "ERR_MESSAGE_INVALID" });
  }

  const msg = await Message.create({
    chat_id: chat.id,
    sender_id: loggedUser.id,
    text: data.content,
    send_date: data.timestamp,
    message_status: "Seen", //TODO: implement this?
  }).save();

  res.status(200).json({ status: "OK" });
};
