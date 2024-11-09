const express = require("express");
const auth = express.Router();
const UserModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const { loginSchema } = require("../utils/validators.js");

auth.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  try {
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "Email not Found",
      });
    } else {
      // compare password
      const checkPassword = await user.verifyPassword(password);
      // compare password
      if (checkPassword) {
        // jwt token
        const token = await user.getJwt();
        // jwt token
        let days = new Date();
        days.setDate(days.getDate() + 7);
        res.cookie("token", token, { httpOnly: true, expires: days });
        return res.json({
          msg: "Login Success!!",
          token,
        });
      } else {
        return res.status(400).json({
          msg: "Password not matched..",
        });
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

auth.post("/signup", async (req, res) => {
  const { firstName, lastName, email, age, password, gender } = req.body;
  try {
    var hashpassword = await bcrypt.hash(password, 10);

    const createUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashpassword,
      gender: gender,
      age: age,
    });
    await createUser.save();
    return res.json({
      msg: "User Created!!",
    });
  } catch (err) {
    return res.status(400).json({
      msg: err.message,
    });
  }
});

module.exports = auth;
