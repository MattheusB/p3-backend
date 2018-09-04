const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("../static"));


const userRoute = require("../src/routes/user.route");
const chatRoute = require("../src/routes/chat.route");

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/",(req, res) =>{
    res.json("Welcome to TinDog");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;