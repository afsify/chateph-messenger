const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  place: {
    type: String,
  },
  image: {
    type: String,
  },
});

const adminModel = mongoose.model("admins", adminSchema);

module.exports = adminModel;
