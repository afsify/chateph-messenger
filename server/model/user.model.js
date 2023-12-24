const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unblocked",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
