const Joi = require("joi");

function validateUser (user){
    schema = {
        "name": Joi.string().min(1),
        "email": Joi.string().email({minDomainAtoms: 2})
    }
return Joi.validate(user, schema);
}

function validateChat(chat){
schema ={
    "user1": Joi.string().min(1),
    "user2": Joi.string().min(1)
}
return Joi.validate(chat, schema);
}


module.exports ={
    validateChat,
    validateUser
}