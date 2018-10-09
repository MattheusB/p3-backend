/* eslint-disable*/

const strategy = require("passport-local").Strategy;
const userModel = require("../user/user.model");
const bcrypt = require("bcryptjs");


function checkPassword (password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = function(passport){

    function findUser (id, callback){
        const objectID = require("mongodb").ObjectId;
        userModel.findById(id, (err,doc) =>{
            callback(err, doc);
        });
    }

    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        findUser(id, function(error, user){
            done(error, user);
        });
    });

    passport.use(new strategy({
        "usernameField": "email",
        "passwordField": "password"
    },
    (email, password, done) =>{
        userModel.findOne({email}, (error, user) =>{

        if(error){
            return done(error);
        }
        else if(!user){
            return done(null, false, "Não foi possível encontrar o usuário com esse email.");
        }

        const hash = user.password;
        if(checkPassword(password, hash)){
            return done(null, user);
        }else{
            return done(null, false, "Senha incorreta.")
        }
    });

    }));
};