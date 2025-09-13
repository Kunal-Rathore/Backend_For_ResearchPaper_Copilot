
// db functions
const chatService = require("../services/chatService");

// agentCoordinator
const agentCoordinator = require("../agents/coordinatorAgent");


const query = async (req, res) => {

    try {
        const userId = req.userId;
        const query = req.body.query;

        // agent call 
        const agentAnswer = agentCoordinator.runPipeline(query);

        //store in db
        const result = await chatService.storeQueryAndAnswer(userId, query, agentAnswer);
        // return _id of new query for pdf generation frontend could send back
        return res.json({ messge: agentAnswer });

    } catch (error) {
        console.log("Error in chat controller- " + error);
        return res.json({ error: error })
    }

    // 1 → send it to the ** Coordinator Agent

    //2   Get final response(after search → summary → validation).


    //3   Return`{ answer, papers, summary }`.
    //4   Save response in DB.

}

const fetch = async (req, res) => {
    try {
        const result = await chatService.getQueries(req.userId);
        res.json({ result });

    } catch (error) {
        console.log("Error in fetch chat controller- " + error);
        return res.json({ error: error })
    }
}



module.exports = { query, fetch }