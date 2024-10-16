// Basic settings
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require('dotenv').config();
const app = express();
const MONGODB_URL_PROD = process.env.MONGODB_URL_PROD;
//testing
console.log("mongouri", MONGODB_URL_PROD);
app.use(bodyParser.json());
// "/api" 가 불려지면 index 파일로 감
app.use(cors());
app.use("/api",indexRouter);

const mongoURI = MONGODB_URL_PROD;
mongoose
    .connect(mongoURI, {useNewUrlParser:true})
    .then(() => {
        console.log("mongoose connected");})
    .catch((err) => {
        console.log("DB connection failed", err);});

// set up listener
app.listen(process.env.PORT || 5000, () =>{
    console.log("server on 5000");
});


