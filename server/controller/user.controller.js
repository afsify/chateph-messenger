const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const avatar = require("../public/images/avatar");

//! ============================================== Lets Start ==============================================

const start = async (req, res, next) => {
  try {
    const { name, place, gender } = req.body;
    const userData = await userModel.findOne({ name });
    const selected = gender === "male" ? avatar.male : avatar.female;
    const profile = selected[Math.floor(Math.random() * selected.length)];
    if (!userData) {
      userModel
        .create({
          name: name,
          place: place,
          gender: gender,
          image: profile,
        })
        .then(async () => {
          let userData = await userModel.findOne({ name: name });
          let token = jwt.sign(
            { id: userData._id, role: "user" },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).send({
            message: "Let's Start",
            success: true,
            token,
          });
        });
    } else if (userData.status === "blocked") {
      return res
        .status(403)
        .send({ message: "User is Blocked", success: false });
    } else {
      if (userData) {
        return res
          .status(401)
          .send({ message: "Username is already taken", success: false });
      }
    }
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

//! =============================================== User Info ===============================================

const getUser = async (req, res, next) => {
  try {
    const userData = await userModel.findById(req.userId, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (userData) {
      res.status(200).send({
        auth: true,
        userData,
        status: true,
      });
    } else {
      res
        .status(401)
        .json({ auth: false, success: false, message: "Session Expired" });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

//! =============================================== Find User ===============================================

const findUser = async (req, res, next) => {
  try {
    console.log("findUser");
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await userModel
      .find(keyword)
      .find({ _id: { $ne: req.userId } });
    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

module.exports = {
  start,
  getUser,
  findUser,
};
