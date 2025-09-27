
const API_KEY = process.env.OPEN_ROUTER_API;

async function summaryAgent(searchAgentAns, query) {


    console.log("summaryAgent executing");

    // formating the ans in single string
    const data = searchAgentAns.map((d, i) => {
        return `Paper ${i + 1}- ${d.title} by ${d.author.join(", ")} \n Abstract: ${d.summary} \n Link- ${d.link} \n Published- ${d.published} \n categories- ${d.categories}`
    });
    const dataInString = data.join("\n\n");


    const prompt = `You are a research assistant AI. The user is researching: "${query}".

        For each paper below:

        1. Summarize the **main contributions** in simple, clear language.
        2. Highlight the **key findings**, especially comparing Web3 vs Web2 where relevant.
        3. Note any **important limitations** or gaps.
        4. Keep abstracts **short (2-3 lines max)**.
        5. Normalize the category field (e.g., if multiple letters, keep only one main category).
        6. Present the output in **numbered format**:
        - Paper #: Title, Authors
            1. Main Contributions:
            2. Key Findings:
            3. Important Limitations:
            4. Links:

        Papers: ${dataInString}
        `

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": `application/json`
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

        const rawData = await response.json();
        console.log(rawData);

        if (!rawData) { throw new Error("No response from summary agent") }

        const output = await rawData.choices[0].message.content;


        console.log("summaryAgent executed ");

        return output;
    } catch (error) {

        console.log("Error in summary agent- " + error);
        // need to find way what to do if fails
    }
}

module.exports = summaryAgent;