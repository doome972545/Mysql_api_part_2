const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).send("token is invalid");
            req.user = user;
            next();
        })
    } else {
        return res.status(500).send("No token provided")
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if (!req.user) {
            console.log("No token provided")
            return res.send("is not authenticated")
        }else if(req.user.isAdmin){
            next();
        } else {
            console.log("Token provided")
            return res.status(403).json("You are not Admin");
        }
    });
};
const verifyTokenNurse = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if (!req.user) {
            console.log("No token provided")
            return res.send("is not authenticated")
        }else if(req.user.isNurse){
            next();
        } else {
            console.log("Token provided")
            return res.status(403).json("You are not Admin");
        }
    });
};
module.exports = {verifyToken,verifyTokenAndAdmin};