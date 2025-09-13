

// model
const conversationsModel = require("../models/ConversationModel");



// storeQuery

async function storeQueryAndAnswer(userId, query, agentAnswer) {

    const { answer, papers, summary, validation } = agentAnswer;

    const result = await conversationsModel.create({
        userId: userId,
        query: query,
        answer: answer,
        papers: papers,
        summary: summary,
        validation: validation
    });
    return result;
}

// fetchQuery history
async function getQueries(userId) {
    return await conversationsModel.find({
        userId: userId
    });

}

// checkQueryExists

async function findConversation(userId, queryId) {

    const result = await conversationsModel.findOne({
        _id: queryId,
        userId: userId,
    });
    if (!result) {
        const error = new Error("Coverstation not found");
        throw error;
    }
    return result;


}



module.exports = { storeQueryAndAnswer, getQueries, findConversation }