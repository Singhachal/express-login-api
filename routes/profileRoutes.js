const express = require("express");
const router  = express.Router();
const { getProfile, updateProfile } = require("../controllers/profileController"); // only controller functions
const { verifyToken } = require("../middleware/auth"); // only middleware

// protected routes
router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateProfile);

module.exports = router;
