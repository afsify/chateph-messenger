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
    expiresAt: {
      type: Date,
      default: Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("find", function () {
  this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
});

userSchema.pre("deleteOne", { document: true }, async function (next) {
  if (this.expiresAt <= new Date()) {
    await this.model.deleteOne({ _id: this._id });
  }
  next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
