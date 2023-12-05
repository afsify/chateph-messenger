const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Token not Found",
        success: false,
        auth: false,
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            message: "Authorization Failed",
            success: false,
            auth: false,
          });
        } else if (
          decoded.exp * 1000 > Date.now() &&
          decoded.role === "admin"
        ) {
          req.adminId = decoded.id;
          next();
        } else {
          return res.status(401).send({
            message: "Authorization Failed",
            success: false,
            auth: false,
          });
        }
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message, success: false, auth: false });
  }
};

const userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Token not Found",
        success: false,
        auth: false,
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            message: "Authorization Failed",
            success: false,
            auth: false,
          });
        } else if (decoded.exp * 1000 > Date.now() && decoded.role === "user") {
          req.userId = decoded.id;
          next();
        } else {
          return res.status(401).send({
            message: "Authorization Failed",
            success: false,
            auth: false,
          });
        }
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message, success: false, auth: false });
  }
};

module.exports = { adminAuth, userAuth };
