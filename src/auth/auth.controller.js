const passport = require("passport");
const httpConstrant = require("../constrants/http.constrants");

exports.login = (req, res, next) =>{
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
};

exports.logout = (req, res) =>{
    req.logout();
    return res.json("Logout realizado.");
};

exports.verify = (req, res) =>{
    if (req.isAuthenticated()){
        res.status(httpConstrant.OK).json({
            "user": req.user,
            "status": true
        });
    
    } else {
        res.redirect("/");
    }
};