const express = require("express");
const app = express();
require("dotenv").config();
var cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const ProfileRouter = require("./routes/profile.js");
const RequestRouter = require("./routes/request.js");

app.use("/auth", authRouter);
app.use("/profile", ProfileRouter);
app.use("/request", RequestRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on the Port 4000");
    });
  })
  .catch((error) => {
    console.log("Database Connection error.");
  });
