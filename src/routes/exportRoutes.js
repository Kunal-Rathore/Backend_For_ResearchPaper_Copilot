//libraries
const express = require('express');

// middlewares
const { tokenValidation } = require('../middlewares/authMiddleware');
const { checkConverstationExists } = require('../middlewares/exportMiddleware');

// controllers
const exportController = require('../controllers/exportController');

const chat = express.Router();

chat.post('/:queryId', tokenValidation, checkConverstationExists, exportController.exp);

module.exports = chat;
