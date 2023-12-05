const express = require("express");
const user_router = express.Router();
const userController = require("../controller/user.controller");
const chatController = require("../controller/chat.controller");
const messageController = require("../controller/message.controller");
const { userAuth } = require("../middleware/auth");

//? ============================================= Authorization =============================================

user_router.post("/send-otp", userController.sendOTP);
user_router.post("/verify-otp", userController.verifyOTP);
user_router.post("/login", userController.login);
user_router.get("/get-user", userAuth, userController.getUser);

//? ============================================ Forgot Password ============================================

user_router.post("/forgot-password", userController.forgotPassword);
user_router.post("/check-otp", userController.checkOTP);
user_router.post("/reset-password", userController.resetPassword);

//? ================================================ Profile ================================================

user_router.post("/update-profile", userAuth, userController.updateProfile);
user_router.get("/find-user", userAuth, userController.findUser);

//? ================================================= Chat =================================================

user_router.post("/access-chat", userAuth, chatController.accessChat);
user_router.get("/fetch-chat", userAuth, chatController.fetchChat);
user_router.post("/create-group", userAuth, chatController.createGroup);
user_router.put("/rename-group", userAuth, chatController.renameGroup);
user_router.put("/group-remove", userAuth, chatController.groupRemove);
user_router.put("/group-add", userAuth, chatController.groupAdd);

//? ================================================ Message ================================================

user_router.get("/list-message/:chatId", userAuth, messageController.listMessage);
user_router.post("/send-message", userAuth, messageController.sendMessage);

module.exports = user_router;
