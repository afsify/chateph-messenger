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
    expiresAt: {
      type: Date,
      default: Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

messageSchema.pre("find", function () {
  this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
});

messageSchema.pre("deleteOne", { document: true }, async function (next) {
  if (this.expiresAt <= new Date()) {
    await this.model.deleteOne({ _id: this._id });
  }
  next();
});

const messageModel = mongoose.model("messages", messageSchema);

module.exports = messageModel;
