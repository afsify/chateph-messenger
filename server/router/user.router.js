const express = require("express");
const user_router = express.Router();
const { userAuth } = require("../middleware/auth");
const userController = require("../controller/user.controller");
const chatController = require("../controller/chat.controller");
const messageController = require("../controller/message.controller");

//? ============================================= Authorization =============================================

user_router.post("/start", userController.start);
user_router.get("/get-user", userAuth, userController.getUser);
user_router.get("/find-user", userAuth, userController.findUser);

//? ================================================= Chat =================================================

user_router.post("/access-chat", userAuth, chatController.accessChat);
user_router.get("/fetch-chat", userAuth, chatController.fetchChat);

//? ================================================ Message ================================================

user_router.get("/list-message/:chatId", userAuth, messageController.listMessage);
user_router.post("/send-message", userAuth, messageController.sendMessage);

module.exports = user_router;
