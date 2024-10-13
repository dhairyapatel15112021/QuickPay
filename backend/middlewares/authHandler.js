const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const Authentication = async (req,res,next)=>{
    try{
        const headers = req.headers.authorization;
        if(!headers || !headers.startsWith("bearer")){
            return res.status(403).json({"err":"invalid toekn"});
        }
        const token = headers.split(" ")[1];
        const verifyUser = jwt.verify(token,process.env.ACCESS_TOKEN);
        if(verifyUser.id){
            req.id = verifyUser.id;
            next();
        }
        else{
            return res.status(403).json({"err":"invalid toekn"});
        }
    }
    catch(err){
        return res.status(403).json({"err":"WRONG JWT"});
    }
}

module.exports = {
    AuthHandler : Authentication
}