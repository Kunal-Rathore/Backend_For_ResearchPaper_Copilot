/* // 1) chat gpt-

// library
const OpenAI = require('openai');

//rawHtml-Util
const returnRawHtml = require("../utils/rawHtml");


const client = new OpenAI({
  apiKey: process.env.API_OPENAI,
});

async function generateHtml(conversation) {
  const { query, answer, papers, summary, validation } = conversation;

  const prompt = `
            You are an "HTML Agent". Format the following research assistant data into a visually appealing HTML page.

            - DO NOT include any code block markers like \`\`\`html.
            - Use <section> for main categories: Query, Answer, Papers, Summary, Validation.
            - Use <article> for each paper including title, authors, link, and paper ID.
            - Use <h1> for main heading, <h2> for section headings, <h3> for paper titles.
            - Bold important labels like Authors, Link, Paper ID, Feedback.
            - Include inline CSS for better readability:
                - Add spacing (margin/padding) between sections and articles.
                - Use different colors for headings (vary colors slightly each time).
                - For Validation: if "Is Valid" is true → green text, if false → red text.
                - Use readable font-family and appropriate font sizes.
                - Optional: subtle background color or border for sections for modern look.
            - Make the format modern and visually appealing, vary layout, or font sizes slightly each time.
            - Return ONLY HTML (no explanations).

            Query: ${query}
            Answer: ${answer}
            Papers: ${papers.join(', ')}
            Summary: ${summary}
            Validation: ${JSON.stringify(validation)}
            `;



  try {
    //  req to agent
    const completions = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [{ type: 'text', text: prompt }], // messges is an array cause gpt thinks message can have multiple in one request therefore
        },
      ],
    });
    const html = completions.choices[0].message.content;
    if (!html) {
      throw Error("No output_text");
    }
    return html;

  } catch (error) {

    console.log("error in htmlAgent- " + error);
    return returnRawHtml(query, answer, papers, summary, validation);

  }
}

module.exports = generateHtml;

 */


/*  2) Fetch url code-
 
// library

// rawHtml-Util
const { isChatCompletionFunctionTool } = require("openai/lib/parser.js");
const returnRawHtml = require("../utils/rawHtml");

const OpenRouterAPI = process.env.OPEN_ROUTER_API;

async function generateHtml(conversation) {

  const { query, answer, papers, summary, validation } = conversation;
  try {

    const prompt = `
            You are an "HTML Agent". Format the following research assistant data into a visually appealing HTML page.

            - DO NOT include any code block markers like \`\`\`html.
            - Use <section> for main categories: Query, Answer, Papers, Summary, Validation.
            - Use <article> for each paper including title, authors, link, and paper ID.
            - Use <h1> for main heading, <h2> for section headings, <h3> for paper titles.
            - Bold important labels like Authors, Link, Paper ID, Feedback.
            - Include inline CSS for better readability:
                - Add spacing (margin/padding) between sections and articles.
                - Use different colors for headings (vary colors slightly each time).
                - For Validation: if "Is Valid" is true → green text, if false → red text.
                - Use readable font-family and appropriate font sizes.
                - Optional: subtle background color or border for sections for modern look.
            - Make the format modern and visually appealing, vary layout, or font sizes slightly each time.
            - Return ONLY HTML (no explanations).

            Query: ${query}
            Answer: ${answer}
            Papers: ${papers.join(', ')}
            Summary: ${summary}
            Validation: ${JSON.stringify(validation)}
            `;


    const completions = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "openrouter/sonoma-sky-alpha",
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: prompt }]
          }
        ]
      }),
      headers: {
        "Authorization": `Bearer ${OpenRouterAPI}`,
        "Content-Type": "application/json"
      }
    });
    const response = await completions.json();
    const html = response.choices[0].message.content;
    return html;

  } catch (err) {
    console.log("error in htmlAgent- " + err);
    return returnRawHtml(query, answer, papers, summary, validation);
  }
}




module.exports = generateHtml;

*/
