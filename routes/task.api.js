const express = require("express");
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

//add to-dos
// before creating tasks, check authentication via authController
router.post("/", authController.authenticate, taskController.createTask);
//check to-dos
//after testing on web, will see only "get tasks"
router.get("/", taskController.getTask);
//change to-dos
router.put("/:id", (req,res) => {
    res.send("edit tasks");
});
//delete to-dos
router.delete("/:id", (req,res) => {
    res.send("delete task");
});

//exports router, then the router can be used
module.exports = router;
