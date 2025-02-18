const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken");
const authmiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message:"no token provided"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
        req.userId = decoded.userId;
        next();
        }
        else{
        return res.status(403).json({message:"invalid token"});

        }
    }catch(err){
        return res.status(403).json({message:"invalid token"});

    }

}
module.exports = {authmiddleware};
