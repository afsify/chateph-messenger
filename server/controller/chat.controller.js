const chatModel = require("../model/chat.model");
const userModel = require("../model/user.model");

//! ============================================= List User =============================================

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.sendStatus(400);
  }
  var isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.userId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.userId, userId],
    };
    try {
      const createdChat = await chatModel.create(chatData);
      const FullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

//! ============================================= Create Chat =============================================

const fetchChat = async (req, res) => {
  try {
    chatModel
      .find({ users: { $elemMatch: { $eq: req.userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel.populate(results, {
          path: "latestMessage.sender",
          select: "name image email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = {
  accessChat,
  fetchChat,
};
