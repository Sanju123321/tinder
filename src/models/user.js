const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  lastName: {
    minlength: 3,
    type: String,
    required: true,

    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  about: {
    type: String,
    default: "This is default about the user.",
  },
  gender: {
    type: String,
  },
});

userSchema.methods.getJwt = async function () {
  const token = await jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

userSchema.methods.verifyPassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
