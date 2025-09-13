
//library
const express = require("express");


// middlewares
const authMiddlewares = require("../../middlewares/authMiddleware");

//controllers
const signControllers = require("../../controllers/signController");



const app = express();


app.post("/", authMiddlewares.zodSign, signControllers.signin)


app.post("/check-token", authMiddlewares.tokenValidation, signControllers.respondTokenExists)



module.exports = app;
