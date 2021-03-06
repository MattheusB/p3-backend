const httpConstrant = require("../constrants/http.constrants");
const chatModel = require("../chat/chat.model");

exports.getChats = (req,res) =>{
    chatModel.find({}).then((users, error) => {
        if (error){
            res.status(httpConstrant.NOT_FOUND).json("Nenhum usuário foi encontrado.");
        }else {
            res.status(httpConstrant.OK).json(users);
        }
    });

};

exports.addChat = (req,res) =>{
    chatModel.estimatedDocumentCount().then((lenght) =>{
        const chat = {
            "id": length + 1,
            "IdUser1": req.body.IdUser1,
            "IdUser2": req.body.IdUser2,
                };
    const newChat = new chatModel(chat);

    newChat.save((error) =>{
        if (error){
            const errorMessage = error.errmsg || error.message
            res.status(httpConstrant.NOT_FOUND).json(errorMessage)
        }else{
            res.status(httpConstrant.OK).json("Chat cadastrado com sucesso.")
        }
    });
            

    });

    
};

exports.getChatID = (req,res) =>{
    chatModel.findOne({"id": req.params.id}).then((chat) =>{
        if (chat){
            res.status(httpConstrant.OK).json(chat);
        }else{
            res.status(httpConstrant.NOT_FOUND).json("Chat com esse id não foi encontrado.")
        }
    })
    
};

exports.updateChat = (req,res) =>{
    chatModel.findOne({"id": req.params.id}).then((chat) =>{
    if(!chat){
        res.status(httpConstrant.NOT_FOUND).res.json("Chat com esse id não foi encontrado.");
    }else {
        chat.user1 = req.body.user1 || chat.user1,
        chat.user2 = req.body.user2 || chat.user2
    
        chat.save((error) =>{
            if(error){
                const errorMessage = error.errmsg || error.message
                res.status(httpConstrant.BAD_REQUEST).json(errorMessage);
            }else{
                res.status(httpConstrant.OK).json("Chat atualizado com sucesso.");
                }
            
        });
        
            
        }
    });

};

exports.deleteChat = (req,res) =>{
    chatModel.deleteOne({"id": req.params.id}).then((erorr))
    if(error.n === 1){
        res.status(httpConstrant.OK).json("Chat deletado com sucesso.");

    }else{
        res.status(httpConstrant.NOT_FOUND).json("Chat com esse id não foi encontrado");
    }
};