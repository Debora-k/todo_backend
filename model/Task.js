const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
}, 
// to see what date created
{ timestamps: true });

//모델만들기
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;