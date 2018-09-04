const express = require("express");
const app = express();
const morgan = require("morgan");
const Joi = require("Joi");

const userUtil = require("../src/util/user.util")

const users = require("../src/data/users.json");
const chats = require("../src/data/chats.json");

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("../static"));

app.get("/",(req, res) =>{
    res.json("Welcome to TinDog");
});

app.get("/user", (req, res) =>{
    res.json(users);
});

app.get("/user/:id", (req, res) =>{
    const user = userUtil.findUser(users, req.params.id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json("O usuário com esse id não foi encontrado");
    }
});

app.get("/user/:id/match", (req,res) =>{
    const user = userUtil.findUser(users, req.params.id);
    if(user){
        res.json(user.matched)
    }else {
        res.status(404).json("Usuário com esse id não foi encontrado");
    }
});

app.get("/chat", (req,res) =>{
    res.json(chats);

});

app.get("/chat/:id", (req,res) =>{
    const chat = findChat(req.params.id);
    if (chat){
        res.json(chat);
    }else{
        res.status(404).json("Chat com esse id não foi encontrado")
    }
});

app.post("/user", (req,res) =>{

    const {error} = validadeUser(req.body);

    if (error){
        res.status(400).json(error.details[0].message);
    }else {
        const user = {
            "id": users.length + 1,
            "name": req.body.name,
            "email": req.body.email,
            "informacoes": req.body.informacoes
        };
        users.push(user);
        res.json("Usuário cadastrado com sucesso");
    }
    
});

app.put("/user/:id", (req,res) =>{
    const user = userUtil.findUser(req.params.id);
    if(!user){
        res.status(404).json("Usuário com esse id não foi encontrado");
    }else{
        const {error} = validadeUser(req.body);
        if(error){
            res.status(400).json(error.details[0].message);
        }else{
            user.name = req.body.name ||  user.name
            user.email = req.body.email || user.email
            user.informacoes = req.body.informacoes || user.informacoes
        }
        
    }
});

app.put("/chat/:id", (req,res) =>{
    const chat = findChat(req.params.id);
    if(!chat){
        res.status(404).res.json("Chat com esse id não foi encontrado");
    }else {
        const {error} = validateChat(req.body);
        if(error){
            res.status(400).json(error.details[0].message);
        }else{
            chat.user1 = req.body.user1 || chat.user1,
            chat.user2 = req.body.user2 || chat.user2
        }
        
    }
});

app.delete("/user/:id", (req, res) =>{
    const user = userUtil.findUser(req.params.id);

    if(user){
        const index = users.indexOf(user);
        users.splice(index,1);
    }else{
        res.status(404).json("Usuário com esse id não foi encontrado");
    }
});

app.delete("/chat/:id", (req,res) =>{
    const chat = findChat(req.params.id);
    if(chat){
        const index = chats.indexOf(chat);
        chats.splice(index,1);
    }else{
        res.status(404).json("Chat com esse id não foi encontrado");
    }
});

function validadeUser (user){
        schema = {
            "name": Joi.string().min(1),
            "email": Joi.string().email({minDomainAtoms: 2})
        }
    return Joi.validate(user, schema);
}

function validateChat(chat){
    schema ={
        "user1": Joi.string().min(1),
        "user2": Joi.string().min(1)
    }
}



function findChat(chatId){
    const chat = chats.find((chat) => chat.id === parseInt(chatId));
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;