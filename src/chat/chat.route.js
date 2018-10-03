const express = require("express");
const router = new express.Router();
const cache = require("memory-cache");

const appUtil = require("../util/app.util");
const validateUtil = require("../util/validate.util");
const httpConstrant = require("../constrants/http.constrants");

chats = [];

cache.put("chats", chats);


router.use((req,res,next) => {
    next();
});

router.get("/", (req,res) =>{
    res.json(cache.get("chats"));

});

router.post("/", (req,res) =>{
    const chat = {
        "id": chats.length + 1,
        "IdUser1": req.body.IdUser1,
        "IdUser2": req.body.IdUser2,
            };

        chats.push(chat);
        cache.put("chats",chats);
        res.status(httpConstrant.OK).json("Chat cadastrado com sucesso.");

    
});

router.get("/:id", (req,res) =>{
    const chat = appUtil.findChat(cache.get("chats"), req.params.id);
    if (chat){
        res.status(httpConstrant.OK).json(chat);
    }else{
        res.status(httpConstrant.NOT_FOUND).json("Chat com esse id não foi encontrado.")
    }
});



router.put("/:id", (req,res) =>{
    const chat = appUtil.findChat(chats.get("chats"), req.params.id);
    if(!chat){
        res.status(httpConstrant.NOT_FOUND).res.json("Chat com esse id não foi encontrado");
    }else {
        const {error} = validateUtil.validateChat(req.body);
        if(error){
            res.status(httpConstrant.BAD_REQUEST).json(error.details[0].message);
        }else{
            chat.user1 = req.body.user1 || chat.user1,
            chat.user2 = req.body.user2 || chat.user2

            cache.put("chats", chats);
            res.status(httpConstrant.OK).json("Chat atualizado com sucesso");
        }
        
    }
});



router.delete("/:id", (req,res) =>{
    const chat = appUtil.findChat(req.params.id);
    if(chat){
        const index = chats.indexOf(chat);
        chats.splice(index,1);

        chats.put("chats", chats);
        res.status(httpConstrant.OK).json("Chat deletado com sucesso");

    }else{
        res.status(httpConstrant.NOT_FOUND).json("Chat com esse id não foi encontrado");
    }
});

module.exports = router;