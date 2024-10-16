//definition of router
const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

//when router use "/tasks" then use "task.api.js"
router.use("/tasks", taskApi);
router.use("/user", userApi);

module.exports = router;



