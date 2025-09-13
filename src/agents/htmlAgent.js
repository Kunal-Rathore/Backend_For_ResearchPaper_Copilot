// library
const OpenAI = require('openai');

// rawHtml-Util
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
            - Make the format modern and visually appealing, vary layout, colors, or font sizes slightly each time.
            - Return ONLY HTML (no explanations).

            Query: ${query}
            Answer: ${answer}
            Papers: ${papers.join(', ')}
            Summary: ${summary}
            Validation: ${JSON.stringify(validation)}
            `;


  try {
    // req to agent
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }], // messges is an array cause gpt thinks message can have multiple in one request therefore
        },
      ],
    });

    if (!response.output_text) {
      throw Error("No output_text");
    }
    return response.output_text;

  } catch (error) {

    console.log("error in htmlAgent- " + error);
    return returnRawHtml(query, answer, papers, summary, validation);

  }
}

module.exports = generateHtml;
