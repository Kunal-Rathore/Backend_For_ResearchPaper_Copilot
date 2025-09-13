

//libraries
const express = require("express");


// rotues
const sign = require("./authRoutes/signRoute");
const register = require("./authRoutes/registerRoute");

const auth = express.Router();


auth.use("/email-register", register);
auth.use("/signin", sign);


module.exports = auth;