const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try{
        const tokenString = req.headers.authorization
        if (!tokenString) {
            throw new Error("Invalid token")
        }
        // from front-end, there is "Bearer " + token, 
        // so if we want to bring an only token then like this:
        const token = tokenString.replace("Bearer ", "");
        // need to check if a token is not expired
        // decrypt the encrypted code to read an id by jwt.verify
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if(error) {
                throw new Error("Invalid token")
            }
            
            // res.status(200).json({status: "success", userId: payload._id});
            // to req, randomly add payload._id
            console.log(payload);
            req.userId = payload._id.toString();      
        });
        //calling it by next()
        next();
        
    }catch(error){
        res.status(400).json({status: "fail", message: error.message})
    }
};

module.exports = authController;