const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {id: 1, name: "usuario1", email: "usuario1.gmail.com", foto: "foto1", informacoes: "Pug muito lindo etc"},
    {id: 2, name: "usuario2", email: "usuario2.gmail.com", foto: "foto2", informacoes: "Bulldog muito feio etc"},
    {id: 3, name: "usuario3", email: "usuario3.gmail.com", foto: "foto3", informacoes: "Husky meio lindo etc"},
];

const chats = [
    {id:123, user1: "Pug", user2: "Pug2"},
    {id:133, user1: "Bulldog", user2: "Bulldog2"}
];

app.get("/",(req, res) =>{
    res.send("Welcome to TinDog");
});

app.get("/user", (req, res) =>{
    res.send(users);
});

app.get("/user/:id", (req, res) =>{
    const user = findUser(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send("O usuário com esse id não foi encontrado");
    }
});

app.get("/user/:id/match", (req,res) =>{
    const user = findUser(req.params.id);
    if(user){
        res.send(user.matched)
    }else {
        res.status(404).send("Usuário com esse id não foi encontrado");
    }
});

app.get("/chat", (req,res) =>{
    res.send(chats);

});

app.get("/chat/:id", (req,res) =>{
    const chat = findChat(req.params.id);
    if (chat){
        res.send(chat);
    }else{
        res.status(404).send("Chat com esse id não foi encontrado")
    }
});

app.post("/user", (req,res) =>{
    const user = {
        "id": users.length + 1,
        "name": req.body.name,
        "email": req.body.email,
        "informacoes": req.body.informacoes
    };
    users.push(user);
    res.send("Usuário cadastrado com sucesso");
});

app.put("/user/:id", (req,res) =>{
    const user = findUser(req.params.id);
    if(!user){
        res.status(404).send("Usuário com esse id não foi encontrado");
    }else{
        user.name = req.body.name ||  user.name
        user.email = req.body.email || user.email
        user.informacoes = req.body.informacoes || user.informacoes
    }
});

app.put("/chat/:id", (req,res) =>{
    const chat = findChat(req.params.id);
    if(!chat){
        res.status(404).res.send("Chat com esse id não foi encontrado");
    }else {
        chat.user1 = req.body.user1 || chat.user1,
        chat.user2 = req.body.user2 || chat.user2
    }
});

app.delete("/user/:id", (req, res) =>{
    const user = findUser(req.params.id);

    if(user){
        const index = users.indexOf(user);
        users.splice(index,1);
    }else{
        res.status(404).send("Usuário com esse id não foi encontrado");
    }
});

app.delete("/chat/:id", (req,res) =>{
    const chat = findChat(req.params.id);
    if(chat){
        const index = chats.indexOf(chat);
        chats.splice(index,1);
    }else{
        res.status(404).send("Chat com esse id não foi encontrado");
    }
});


function findUser(userId){
    const user = users.find((user) => user.id === parseInt(userId));
    return user;
}

function findChat(chatId){
    const chat = chats.find((chat) => chat.id === parseInt(chatId));
}