/* eslint-disable consistent-return */

const express = require("express");
const router = new express.Router();
const passport = require("passport");
const auth = require("../auth/auth");
const httpConstrant = require("../constrants/http.constrants");

router.post("/", (req, res, next) =>{
    passport.authenticate("local", (err, user, info) =>{
        if (err) {
            return next(err);
        }
        else if (user){
            req.logIn(user, (error) =>{
                if (!error){
                    return res.json("Login realizado.");
                }else {
                    return res.json(error);
                }
            });
        }else{
            return res.json(info);
        }
    })(req,res,next);
});

router.delete("/", auth.ensureAuthenticated, (req, res) =>{
    req.logout();
    return res.json("Logout realizado.");
});

router.get("/verify", (req, res) =>{
    if (req.isAuthenticated()){
        res.status(httpConstrant.OK).json({
            "user": req.user,
            "status": true
        });
    
    } else {
        res.redirect("/");
    }
});

module.exports = router;