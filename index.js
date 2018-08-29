const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {id: 1, name: "usuario1", email: "usuario1.gmail.com", foto: "foto1", informacoes: "Pug muito lindo etc"},
    {id: 2, name: "usuario2", email: "usuario2.gmail.com", foto: "foto2", informacoes: "Bulldog muito feio etc"},
    {id: 1, name: "usuario3", email: "usuario3.gmail.com", foto: "foto3", informacoes: "Husky meio lindo etc"},
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

function findUser(userId){
    const user = users.find((user) => user.id === parseInt(userId));
    return user;
}