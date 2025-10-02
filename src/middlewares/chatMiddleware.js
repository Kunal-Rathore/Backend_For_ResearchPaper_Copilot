

// utils
const { validateWithZod, handleZod } = require("../utils/validator");

// zodSchema 
const querySchema = require("../validators/chatValidation");

function zodQuery(req, res, next) {
    const result = validateWithZod(querySchema, req.body);
    return handleZod(res, result, next);
}

module.exports = { zodQuery }