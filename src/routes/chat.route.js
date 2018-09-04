const express = require("express");
const router = new express.Router();



const appUtil = require("../util/app.util");
const validateUtil = require("../util/validate.util");

const chats = require("../data/chats.json");

router.get("/chat", (req,res) =>{
    res.json(chats);

});

router.get("/chat/:id", (req,res) =>{
    const chat = appUtil.findChat(req.params.id);
    if (chat){
        res.json(chat);
    }else{
        res.status(404).json("Chat com esse id não foi encontrado")
    }
});



router.put("/chat/:id", (req,res) =>{
    const chat = appUtil.findChat(req.params.id);
    if(!chat){
        res.status(404).res.json("Chat com esse id não foi encontrado");
    }else {
        const {error} = validateUtil.validateChat(req.body);
        if(error){
            res.status(400).json(error.details[0].message);
        }else{
            chat.user1 = req.body.user1 || chat.user1,
            chat.user2 = req.body.user2 || chat.user2
        }
        
    }
});



router.delete("/chat/:id", (req,res) =>{
    const chat = appUtil.findChat(req.params.id);
    if(chat){
        const index = chats.indexOf(chat);
        chats.splice(index,1);
    }else{
        res.status(404).json("Chat com esse id não foi encontrado");
    }
});