
//library
const express = require("express");


// middlewares
const authMiddlewares = require("../../middlewares/authMiddleware");

//controllers
const registerControllers = require("../../controllers/registerController");

const app = express();

// /email-register
app.post("/", authMiddlewares.zodSign, registerControllers.signup);


// email checking debounce route
app.post("/check-email", registerControllers.checkEmail);

app.post("/otp-verification", authMiddlewares.checkOTP, registerControllers.register);

module.exports = app;