

const API_KEY = process.env.OPEN_ROUTER_API;;

async function validationAgent(summaryAgentAns, query) {


    console.log("validationAgent executing");


    const prompt = `
You are a Validation Agent. Your task is to validate the AI-generated summary and papers for the following query:

Query: """${query}"""

Summary Agent Output: """${summaryAgentAns}"""

**Requirements for MongoDB compatibility**:
1. Top-level fields **must always include**:
   - "answer" (string, required)
   - "summary" (string, required)
2. Papers must be an array of objects, each with:
   - "paperId" (string, required)
   - "title" (string, required)
   - "authors" (array of strings, required, at least one author)
   - "url" (string, required; if unknown, use "not provided")
3. Validation object must include:
   - "isValid" (boolean, required)
   - "score" (number, required, 0 to 1)
   - "feedback" (string; optional)
   - "citations" (array of paperIds, required)

**Instructions**:
- Ensure **answer** is a concise AI-powered summary of the query.
- Ensure **summary** reflects all papers’ key points.
- Fill missing paper URLs with "not provided".
- Validate consistency between answer, summary, and papers.
- Output the final JSON strictly in the following format:

{
    "answer": "string",
    "papers": [
        {
            "paperId": "string",
            "title": "string",
            "authors": ["string"],
            "url": "string"
        }
    ],
    "summary": "string",
    "validation": {
        "isValid": true,
        "score": 0.0,
        "feedback": "string",
        "citations": ["paperId"]
    }
}

Return only the JSON. Do not include any extra commentary or explanation.
`;


    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY} `,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openrouter/auto",
                    messages: [
                        {
                            role: "user",
                            content: [{ type: "text", text: prompt }]
                        }
                    ]
                })
            });

        const output = await response.json();

        if (!output) {
            throw new Error("no reponse from validation agent");
        }
        const validationAgentAns = output.choices[0].message.content;


        console.log("validationAgent executed");

        return validationAgentAns;
    } catch (error) {
        console.log("Error in validation agent- " + error);
        // need to find way for handling no response
    }
}

module.exports = validationAgent;