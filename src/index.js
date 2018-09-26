const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1/tindb", {"useNewUrlParser": true});

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("../static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));


const userRoute = require("./user/user.route.js");
const chatRoute = require("./chat/chat.route.js");
const swaggerRoute = require("./config/swagger.route.js");
const enviroment = process.env.enviroment || "development"

if (enviroment != "production"){
    console.log("The system is not running in production!");
}

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/swagger", swaggerRoute);

app.get("/",(req, res) =>{
    res.json("Welcome to TinDog");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;