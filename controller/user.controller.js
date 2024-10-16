const User = require("../model/User");
const bcrypt = require("bcrypt");
// setting up enough time to encrypt
const saltRounds = 10;

const userController = {}

userController.createUser = async(req, res) => {
    try{
        const {email, name, password} = req.body
        //check if the user already signed up
        const user = await User.findOne({email});
        if(user) {
            throw new Error("You already signed up!")
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log("hash", hash);
        const newUser = new User({email,name,password:hash});
        await newUser.save();
        res.status(200).json({status:"success"});


    } catch(error) {
        res.status(400).json({status:"fail", error});
    }
};

userController.loginWithEmail = async(req,res) => {
    try {
        const { email,password } = req.body;
        // no print out "createdAt", "updatedAt", and "version" info
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
        if(user) {
            // comparing passwords from frontend(password) and database password(user.password)
            const isMatch = bcrypt.compareSync(password, user.password);
            if(isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({status:"success", user, token})
            }
        }
        throw new Error("Email or password are not correct.")
    } catch (error){
        res.status(400).json({status:"fail", message:error.message});
    }
};


userController.getUser = async(req,res) => {
    try {
        // it comes from auth.controller.js
        const {userId} = req //or just "const userId = req.userId" from auth.controller.js
        console.log(userId)
        const user = await User.findById(userId);
        if(!user) {
            throw new Error("Cannot find the user")
        }
        res.status(200).json({status:"success", user});
    } catch (error) {
        res.status(400).json({status:"fail", message:error.message});
    }

}


module.exports = userController;



