const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {"idUser1": Number,
     "idUser2": Number
},
   {"versionKey": false}
   );
   
const chat = mongoose.model("Chat", chatSchema);
  
module.exports = chat;