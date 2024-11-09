const express = require("express");
const userRouter =  express.Router();
const userAuth = require("../middleware/userAuth.js");
const UserModel = require("../models/user.js");

userRouter.get("/", userAuth, async(req,res)=>{
    try {
      const user = await UserModel.findById(req.user_id);
      return res.json({
        msg:"Profile",
        user
      })
    } catch (error) {
        return res.status(400).json({
          msg:error.message
        })
    }
  });
  
module.exports = userRouter;