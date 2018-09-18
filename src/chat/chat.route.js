const express = require("express");
const router = new express.Router();
const cache = require("memory-cache");

const appUtil = require("../util/app.util");
const validateUtil = require("../util/validate.util");

const chats = require("./chats.json");
<<<<<<< HEAD

cache.put("chats", chats);


router.use((req,res,next) => {
    next();
});
=======
>>>>>>> de4799746986518b4d38e1973e03aa152697de20

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
<<<<<<< HEAD
        cache.put("chats",chats);
        res.status(200).json("Chat cadastrado com sucesso");
=======
        res.json("Chat cadastrado com sucesso");
>>>>>>> de4799746986518b4d38e1973e03aa152697de20

    
});

router.get("/:id", (req,res) =>{
    const chat = appUtil.findChat(cache.get("chats"), req.params.id);
    if (chat){
        res.status(200).json(chat);
    }else{
        res.status(404).json("Chat com esse id não foi encontrado")
    }
});



router.put("/:id", (req,res) =>{
    const chat = appUtil.findChat(chats.get("chats"), req.params.id);
    if(!chat){
        res.status(404).res.json("Chat com esse id não foi encontrado");
    }else {
        const {error} = validateUtil.validateChat(req.body);
        if(error){
            res.status(400).json(error.details[0].message);
        }else{
            chat.user1 = req.body.user1 || chat.user1,
            chat.user2 = req.body.user2 || chat.user2

            cache.put("chats", chats);
            res.status(200).json("Chat atualizado com sucesso");
        }
        
    }
});



router.delete("/:id", (req,res) =>{
    const chat = appUtil.findChat(req.params.id);
    if(chat){
        const index = chats.indexOf(chat);
        chats.splice(index,1);

        chats.put("chats", chats);
        res.status(200).json("Chat deletado com sucesso");

    }else{
        res.status(404).json("Chat com esse id não foi encontrado");
    }
});

module.exports = router;