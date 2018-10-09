const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {"id": Number,
     "name": {
         "type": String,
         "minlenght": [3,"O nome é muito curto"],
         "required": true
     },
     "email": {
        "type": String,
        "unique": true,
        "match": [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Por favor, digite um email válido"],
        "required": true
    },
    "password": {
        "type": String,
        "minlength": [5, "A senha é muito curta"],
        "required": true
    },
    "information": {
        "type": String,
        "required": false
    },
    "likes":{
        "type": [Number],
        "required": false

    },
    "role": {
        "type": String,
        "enum": ["admin", "default"],
        "required": true
}},
   {"versionKey": false}
   );
   
const user = mongoose.model("User", userSchema);
  
module.exports = user;