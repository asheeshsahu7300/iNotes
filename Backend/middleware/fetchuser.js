const jwt = require("jsonwebtoken");
const jwt_code = "amanisgoodprogrammer";
const fetchuser=(req,res,next)=>{
    //get the user from jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a vallid token"});
    }
    try {
    const data=jwt.verify(token,jwt_code);
    req.user=data.user;
    console.log(req.user);
    next();
    } catch (error) { 
        res.status(401).send({error:"please authenticate using a vallid token"});
    }
    
}
module.exports=fetchuser;