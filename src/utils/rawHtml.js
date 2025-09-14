

function returnRawHtml(query, answer, papers, summary, validation) {

  return `
<section>
  <h1>Query</h1>
  <p>${query}</p>
</section>

<section>
  <h2>Answer</h2>
  <p>${answer}</p>
</section>

<section>
  <h2>Papers</h2>
  ${papers.map(p => `
    <article>
      <h3>${p.title}</h3>
      <p><strong>Authors:</strong> ${(p.authors || []).join(", ")}</p>
      <p><strong>Link:</strong> <a href="${p.url}">${p.url}</a></p>
      <p><strong>Paper ID:</strong> ${p.paperId}</p>
    </article>
    `).join("")
    }
</section>

<section>
  <h2>Summary</h2>
  <p>${summary}</p>
</section>

<section>
  <h2>Validation</h2>
  <p style="color: ${validation.isValid ? "green" : "red"};">
    <strong>Is Valid:</strong> ${validation.isValid}
  </p>
  <p><strong>Score:</strong> ${validation.score}</p>
  <p><strong>Feedback:</strong> ${validation.feedback}</p>
  <p><strong>Citations:</strong> ${validation.citations.join(", ")}</p>
</section>
`;
}

module.exports = returnRawHtml;