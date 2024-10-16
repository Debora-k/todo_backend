const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true});

// to get rid of printed password
userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id:this._id}, JWT_SECRET_KEY, {expiresIn:'1d'});
    //to use the token, then 'return'
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports= User;