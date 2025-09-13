

//db function
const { findConversation } = require("../services/chatService");

async function checkConverstationExists(req, res, next) {

    try {
        const userId = req.userId;
        const queryId = req.params.queryId;

        req.result = await findConversation(userId, queryId);
        next();
    } catch (err) {
        console.log("Error in checkConverstationId middleware- ", err);
        return res.json({ err: "Converstaion not found" }); // even if the query id is invalid
    }

}

module.exports = { checkConverstationExists }