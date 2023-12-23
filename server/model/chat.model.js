const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "messages",
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

chatSchema.pre("find", function () {
  this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
});

chatSchema.pre("deleteOne", { document: true }, async function (next) {
  if (this.expiresAt <= new Date()) {
    await this.model.deleteOne({ _id: this._id });
  }
  next();
});

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
