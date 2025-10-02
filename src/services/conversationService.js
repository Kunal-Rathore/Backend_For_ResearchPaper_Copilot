const mongoose = require('mongoose');

// model
const conversationsModel = require("../models/ConversationModel");

// storeQuery

async function storeQueryAndAnswer(userId, query, answer) {

    const result = await conversationsModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        query: query,
        answer: answer,
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


    const result = await conversationsModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(queryId),
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'papersmodels',
                localField: '_id',
                foreignField: 'queryId',
                as: 'papers'
            }
        }
    ]);
    if (!result.length) {
        throw new Error("Conversation not found");
    }
    return result[0];


}



module.exports = { storeQueryAndAnswer, getQueries, findConversation }