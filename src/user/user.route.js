const express = require("express");
const router = new express.Router();
const cache = require("memory-cache");


const appUtil = require("../util/app.util");
const validateUtil = require("../util/validate.util")

const users = require("./users.json");

cache.put("users", users);

router.use((req,res,next) => {
    next();
});

router.get("/", (req, res) =>{
    res.json(cache.get("users"));
});

router.get("/:id", (req, res) =>{
    const user = appUtil.findUser(cache.get("users"), req.params.id);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json("O usuário com esse id não foi encontrado");
    }
});

router.get("/:id/match", (req,res) =>{
    const user = appUtil.findUser(users, req.params.id);
    if(user){
        res.json(user.matched)
    }else {
        res.status(404).json("Usuário com esse id não foi encontrado");
    }
});

router.post("/", (req,res) =>{

    const {error} = validateUtil.validateUser(req.body);

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
        cache.put("users", users);
        res.status(200).json("Usuário cadastrado com sucesso");
    }
    
});

router.put("/:id", (req,res) =>{
    const user = appUtil.findUser(cache.get("users"), req.params.id);
    if(!user){
        res.status(404).json("Usuário com esse id não foi encontrado");
    }else{
        const {error} = validateUtil.validateUser(req.body);
        if(error){
            res.status(400).json(error.details[0].message);
        }else{
            user.name = req.body.name ||  user.name
            user.email = req.body.email || user.email
            user.informacoes = req.body.informacoes || user.informacoes

            cache.put("chats", chats);
            res.status(200).json("Usuário atualizado com sucesso");
        }
        
    }
});

router.delete("/:id", (req, res) =>{
    const user = appUtil.findUser(cache.get("users"), req.params.id);

    if(user){
        const index = users.indexOf(user);
        users.splice(index,1);

        cache.put("chats", chats);
        res.status(200).json("Usuário deletado com sucesso");
    }else{
        res.status(404).json("Usuário com esse id não foi encontrado");
    }
});

module.exports = router;
