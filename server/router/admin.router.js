const express = require("express");
const admin_router = express.Router();
const adminController = require("../controller/admin.controller");
const { adminAuth } = require("../middleware/auth");

//? ============================================= Authorization =============================================

admin_router.post("/signin", adminController.signin);
admin_router.get("/get-admin", adminAuth, adminController.getAdmin);

//? ============================================== Dashboard ==============================================

admin_router.get("/list-dashboard", adminAuth, adminController.listDashboard);

//? ============================================== User Manage ==============================================

admin_router.get("/list-user", adminAuth, adminController.listUser);
admin_router.post("/block-user/:userId", adminAuth, adminController.blockUser);
admin_router.post("/unblock-user/:userId", adminAuth, adminController.unblockUser);

//? ================================================ Settings ================================================

admin_router.put("/update-about/:adminId", adminAuth, adminController.updateAbout);

module.exports = admin_router;
