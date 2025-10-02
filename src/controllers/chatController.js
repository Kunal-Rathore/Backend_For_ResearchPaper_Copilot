
// db functions
const conversationsModel = require("../services/conversationService");
const papersModel = require("../services/paperService");

// agentCoordinator
const agentCoordinator = require("../agents/coordinatorAgent");


const query = async (req, res) => {

    try {
        const userId = req.userId;
        const query = req.body.query;

        // agent call 
        //    const agentAnswer = await agentCoordinator.runPipeline(query);

        //  const { answer, papers, summary, validation } = agentAnswer;w

        const answer = 'a';
        //store in db
        const respondFromStoringinConversationModel = await conversationsModel.storeQueryAndAnswer(userId, query, answer);
        // return _id of new query for pdf generation frontend could send back

        const queryId = respondFromStoringinConversationModel._id;

        // storing papers and validation
        //   await papersModel.storeInPaperModel(queryId, papers, summary, validation);


        return res.json({
            message: answer,
            urlToExport: `http://localhost:3000/app/api/export/${queryId}`
        });

    } catch (error) {
        console.log("\n\n\n\nError in chat controller- " + error);
        return res.json({ error: error })
    }

    // 1 → send it to the ** Coordinator Agent

    //2   Get final response(after search → summary → validation).


    //3   Return`{ answer, papers, summary }`.
    //4   Save response in DB.

}

const fetch = async (req, res) => {
    try {
        const result = await conversationsModel.getQueries(req.userId);
        res.json({ result });

    } catch (error) {
        console.log("Error in fetch chat controller- " + error);
        return res.json({ error: error })
    }
}



module.exports = { query, fetch }