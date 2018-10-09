const httpConstrant = require("../constrants/http.constrants");

const ensureAuthenticated = (req, res, next) =>{
    if (req.isAuthenticated()){
        return next();
    }else {
        return res.status(httpConstrant.UNAUTHORIZED).json("Você não tem permissão, precisa logar antes");
    }
}

const authenticateID = (req, res, next) =>{
    const userID = req.user.id;
    if(userID){
        const reqID = parseInt(req.params.id);
        if (userID === reqID){
            return next();
        }else{
            return res.status(httpConstrant.UNAUTHORIZED).json("ID fornecido não tem permissão")
        }

        
    }
    return res.status(httpConstrant.BAD_REQUEST).json("Sem permissão");
}

const authenticateRole = (req,res,next) => {
    const userRole = req.user.role;
    if (userRole) {
        if (userRole === 'representante') {
            return next();
        }
        return res.status(httpConstrant.UNAUTHORIZED).json("Sem permissão pelo tipo de usuário");
    }
    return res.status(httpConstrant.BAD_REQUEST).json('Sem permissão');
};




module.exports ={
    ensureAuthenticated,
    authenticateID,
    authenticateRole
};