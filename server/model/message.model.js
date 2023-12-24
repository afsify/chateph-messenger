const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "chats",
    },
    readBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const messageModel = mongoose.model("messages", messageSchema);

module.exports = messageModel;
