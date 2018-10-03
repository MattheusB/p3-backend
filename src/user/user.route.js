const express = require("express");
const router = new express.Router();
const cache = require("memory-cache");


const appUtil = require("../util/app.util");
const validateUtil = require("../util/validate.util");
const httpConstrants = require("../constrants/http.constrants");

const userModel = require("../user/user.model");

router.use((req,res,next) => {
    next();
});

router.get("/", (req, res) =>{
    userModel.find({}).then((users, error) =>{
        if(error){
            res.status(httpConstrants.NOT_FOUND).json("Usuários não encontrados");
        }else{
            res.status(httpConstrants.OK).json(users);
        }
    });
});

router.get("/:id", (req, res) =>{
    userModel.findOne({"id": req.params.id}).then((user, error) =>{
       if(user){
            res.status(httpConstrants.OK).json(user);
        }else{
            res.status(httpConstrants.NOT_FOUND).json("O usuário com esse id não foi encontrado.");
        }
    });
    
});

router.get("/:id/profile", (req, res) =>{
    res.json("Informações sobre o usuário");
});

router.get("/:id/likes", (req,res) =>{
    userModel.findOne({"id": req.params.id}).then((user,error) => {
        if(user){
            res.json(user.likes)
        }else {
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }
        
    });
    
});

router.post("/", (req,res) =>{

    const users = userModel.estimatedDocumentCount().then((lenght) => {
        
        const user = {
            "id": lenght + 1,
            "name": req.body.name,
            "email": req.body.email,
            "senha": req.body.senha,
            "informacoes": req.body.informacoes
        };

        const newUser = new userModel(user);

        newUser.save((error)=>{
            if (error){
                const errorMessage = error.errmsg || error.message
                res.status(400).json(errorMessage);
            }else {
                res.status(httpConstrants.OK).json("Usuário cadastrado com sucesso");
            }        
        });

    });

    
    
});

router.put("/:id", (req,res) =>{
    const user = appUtil.findUser(cache.get("users"), req.params.id);
    if(!user){
        res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado");
    }else{
        const {error} = validateUtil.validateUser(req.body);
        if(error){
            res.status(httpConstrants.BAD_REQUEST).json(error.details[0].message);
        }else{
            user.name = req.body.name ||  user.name
            user.email = req.body.email || user.email
            user.email = req.body.senha || user.senha
            user.informacoes = req.body.informacoes || user.informacoes

            cache.put("chats", chats);
            res.status(httpConstrants.OK).json("Usuário atualizado com sucesso");
        }
        
    }
});

router.delete("/:id", (req, res) =>{
    const user = appUtil.findUser(cache.get("users"), req.params.id);

    if(user){
        const index = users.indexOf(user);
        users.splice(index,1);

        cache.put("chats", chats);
        res.status(httpConstrants.OK).json("Usuário deletado com sucesso");
    }else{
        res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado");
    }
});

module.exports = router;
