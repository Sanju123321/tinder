const userModel = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                msg:"Token not Found..."
            });
        }
        const user_id = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = user_id?._id;
        next();

    } catch (err) {
        return res.status(400).json({
            msg:err.message
        })
    }
};

module.exports = userAuth;