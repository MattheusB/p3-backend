const userModel = require("../user/user.model");
const bcrypt = require("bcryptjs");
const httpConstrants = require("../constrants/http.constrants");

exports.getUsers = (req, res) =>{
    userModel.find({}).then((users, error) =>{
        if(error){
            res.status(httpConstrants.NOT_FOUND).json("Nenhum usuário foi encontrado.");
        }else{
            res.status(httpConstrants.OK).json(users);
        }
    });
};

exports.getUserID = (req, res) =>{
    userModel.findOne({"id": req.params.id}).then((user) =>{
       if(user){
            res.status(httpConstrants.OK).json(user);
        }else{
            res.status(httpConstrants.NOT_FOUND).json("O usuário com esse id não foi encontrado.");
        }
    });
    
};

exports.getUserProfile = (req, res) =>{
    res.json("Informações sobre o usuário");
};

exports.getUserLikes = (req,res) =>{
    userModel.findOne({"id": req.params.id}).then((user) => {
        if(user){
            res.json(user.likes)
        }else {
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }
        
    });
    
};

exports.addUser = (req,res) =>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    userModel.estimatedDocumentCount().then((lenght) => {
        
        const user = {
            "id": lenght + 1,
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "race": req.body.race,
            "age": req.body.age,
            "role": req.body.role,
            "photo": req.body.photo
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

    
    
};

exports.updateUser = (req,res) =>{
    userModel.findOne({"id": req.params.id}).then((user) =>{
        if(!user){
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }else{
            user.name = req.body.name ||  user.name
            user.email = req.body.email || user.email
            user.password = req.body.password || user.password
            user.race = req.body.race || user.race
            user.age = req.body.age || user.age
    
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

};

exports.deleteUser = (req, res) =>{
    userModel.deleteOne({"id": req.params.id}).then((error) =>{
        if(error.n === 1){
            res.status(httpConstrants.OK).json("Usuário deletado com sucesso.");
        }else {
            res.status(httpConstrants.NOT_FOUND).json("Usuário com esse id não foi encontrado.");
        }
    });
        
    
};