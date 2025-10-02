
const API_KEY = process.env.GEMINI_API;

const returnRawHtml = require("../utils/rawHtml");

async function generateHtml(conversation) {
  const { query, answer } = conversation;
  const { papers, summary, validation } = conversation.papers[0];


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
            - *Make it well looking, there are no division of paragraph on two pages on the A4 size page like half was on bottom of page1 and half was on top of page2, ignore such things keep it will formated*
            - Return ONLY HTML (no explanations).

            Query: ${query}
            Answer: ${answer}
            Papers: ${papers.join(', ')}
            Summary: ${summary}
            Validation: ${JSON.stringify(validation)}
            `;


  try {


    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        headers: {
          "x-goog-api-key": `${API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    )
    const rawHtml = await response.json();
    console.log(JSON.stringify(rawHtml));
    const html = rawHtml.candidates[0].content.parts[0].text;
    console.log(JSON.stringify(html));

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