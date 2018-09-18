const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("../static"));


const userRoute = require("./user/user.route.js");
const chatRoute = require("./chat/chat.route.js");
const swaggerRoute = require("./config/swagger.route.js")

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/swagger", swaggerRoute);

app.get("/",(req, res) =>{
    res.json("Welcome to TinDog");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;