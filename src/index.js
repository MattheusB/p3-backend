const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const half_hour = 1800000;


mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1/tindb", {"useNewUrlParser": true});

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("../static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

require("../src/auth/passport")(passport);
app.use(session({
    "secret": "secret",
    "cookie": {
        "maxAge": half_hour
    },
    "resave": false,
    "saveUninitialized": false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const userRoute = require("./user/user.route.js");
const chatRoute = require("./chat/chat.route.js");
const swaggerRoute = require("./config/swagger.route.js");
const loginRoute = require("../src/auth/auth.route.js");
const enviroment = process.env.enviroment || "development"

if (enviroment != "production"){
    console.log("The system is not running in production!");
}

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/swagger", swaggerRoute);
app.use("/login", loginRoute)

app.get("/",(req, res) =>{
    res.json("Welcome to TinDog");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;