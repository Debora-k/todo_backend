const Task = require("../model/Task");

//1
const taskController ={};

//3
taskController.createTask = async (req, res) => {
    try{
        // task
        // isComplete
        // author
        const { task,isComplete } = req.body;
        // reaching to createTask: req.userId = payload._id.toString(); from auth.controller 
        const { userId } = req;
        const newTask = new Task({ task, isComplete, author:userId });
        await newTask.save();

        //200 means succeed
        //json means sending data
        res.status(200).json({ status:'ok', data:newTask });
    } catch(err) {
        res.status(400).json({ status:'fail', error:err });
    }
};

taskController.getTask = async(req, res) => {
    try {
        //.select("-") dash means except that, display
        // among Task, find everything and populate author which is related to FK
        // that means author brings info (_id, name, email)
        const taskList = await Task.find({}).populate("author");
        //sending ok and to data(taskList)
        res.status(200).json({staus: "ok", data: taskList});
    } catch(err) {
        res.status(400).json({status:"fail", error: err});
    }
};

taskController.putTask = async(req, res) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("App can not find the task");
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (task[item] = req.body[item]));
        await task.save();
        res.status(200).json({ status: "success", data: task });
    } catch (error) {
        res.status(400).json({ status: "fail", error });
    
    }
};


    // try {
    //     const putList = await Task.find({}).select("-__v");
    //     await putList.data();
    //     await putTask.save();

    //     res.status(200).json({staus: "ok", data: editTask});
    // } catch(err) {
    //     res.status(400).json({status:"fail", error: err});
    // }


taskController.deleteTask = async(req, res) => {

    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "success", data: deleteItem});
    } catch (error) {
        res.status(400).json({ status:"fail", error });
    }
};
    // try {
    //     const deleteTask = await Task.delete();
    //     res.status(200).json({staus: "ok", data: deleteTask});
    // } catch(err) {
    //     res.status(400).json({status:"fail", error: err});
    // }



//2
module.exports= taskController;