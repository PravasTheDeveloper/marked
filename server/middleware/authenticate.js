const jwt = require("jsonwebtoken");
const AllUser = require("../models/UserSchema");


const authenticate = async (req , res , next) => {
    try{

        const token = req.cookies.jwtoken;

        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);

        const rootUser = await AllUser.findOne({_id:verifyToken._id , "tokens.token":token});

        if(!rootUser){
            throw new Error("User Not Found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();


    }catch(err){
        res.status(401).send("No thoken provided");
        console.log(err);
    }
}

module.exports = authenticate;