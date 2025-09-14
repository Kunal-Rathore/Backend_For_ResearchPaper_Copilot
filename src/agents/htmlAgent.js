// library
const OpenAI = require("openai");

//file
const returnRawHtml = require("../utils/rawHtml");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API
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

    const completions = await client.chat.completions.create({
      model: "openrouter/sonoma-sky-alpha",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }]
        }
      ]
    });
    const html = await completions.choices[0].message.content;
    if (!html) {
      throw new Error("No response from the html agent");
    }
    return html;

  } catch (error) {
    console.log("Error in html agent- " + error);
    return returnRawHtml(query, answer, papers, summary, validation);
  }

}


module.exports = generateHtml;