const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

// Sign up
router.post("/", userController.createUser);

// Login
router.post("/login", userController.loginWithEmail);

// Look for a user
// userController.getUser is called by next() in auth.controller.js
router.get("/myself", authController.authenticate, userController.getUser);

module.exports = router;