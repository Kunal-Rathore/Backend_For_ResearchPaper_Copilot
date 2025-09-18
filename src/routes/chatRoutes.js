

//libraries
const express = require("express");

// middlewares
const { tokenValidation } = require("../middlewares/authMiddleware");
const chatMiddlwares = require("../middlewares/chatMiddleware");

// controllers
const chatController = require("../controllers/chatController");

const chat = express.Router();


chat.post("/", tokenValidation, (req, res) => {
    res.send("hi from initial route of query");
})






chat.post("/query", tokenValidation, chatMiddlwares.zodQuery, chatController.query);
chat.get("/fetch-all-chat", tokenValidation, chatController.fetch);


module.exports = chat;