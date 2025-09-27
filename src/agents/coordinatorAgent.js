

const searchAgent = require("./searchAgent");
const summaryAgent = require("./summaryAgent");
const validationAgent = require("./validationAgent");

async function runPipeline(query) {

    // call all agents
    const searchAgentAns = await searchAgent(query);
    const summaryAgentAns = await summaryAgent(searchAgentAns, query);
    console.log(summaryAgentAns);
    const validationAgentAns = await validationAgent(summaryAgentAns, query);

    return JSON.parse(validationAgentAns);
}

module.exports = { runPipeline };