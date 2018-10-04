const express = require("express");
const router = new express.Router();
const httpConstrants = require("../constrants/http.constrants");
const userModel = require("../user/user.model");

router.use((req,res,next) => {
    next();
});

router.get("/", (req, res) =>{
    userModel.find({}).then((users, error) =>{
        if(error){
            res.status(httpConstrants.NOT_FOUND).json("Nenhum usuário foi encontrado.");
        }else{
            res.status(httpConstrants.OK).json(users);
        }
    });
});

router.get("/:id", (req, res) =>{
    userModel.findOne({"id": req.params.id}).then((user) =>{
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
    userModel.findOne({"id": req.params.id}).then((user) => {
        if(user){
            res.json(user.likes)
        }else {
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }
        
    });
    
});

router.post("/", (req,res) =>{

    userModel.estimatedDocumentCount().then((lenght) => {
        
        const user = {
            "id": lenght + 1,
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "information": req.body.information
        };

        const newUser = new userModel(user);

        newUser.save((error)=>{
            if (error){
                const errorMessage = error.errmsg || error.message
                res.status(400).json(errorMessage);
            }else {
                res.status(httpConstrants.OK).json("Usuário cadastrado com sucesso.");
            }        
        });

    });

    
    
});

router.put("/:id", (req,res) =>{
    userModel.findOne({"id": req.params.id}).then((user) =>{
        if(!user){
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }else{
            user.name = req.body.name ||  user.name
            user.email = req.body.email || user.email
            user.password = req.body.password || user.password
            user.information = req.body.information || user.information
    
            user.save((error) =>{
                if (error){
                    const errorMessage = error.errmsg || error.message
                    res.status(httpConstrants.BAD_REQUEST).json(errorMessage);
                }else{
                    res.status(httpConstrants.OK).json("Usuário atualizado com sucesso.");
                    }
                });    
        
    };
    
});

});


router.delete("/:id", (req, res) =>{
    userModel.deleteOne({"id": req.params.id}).then((error) =>{
        if(error.n === 1){
            res.status(httpConstrants.OK).json("Usuário deletado com sucesso.");
        }else {
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }
    });
        
    
});

module.exports = router;
