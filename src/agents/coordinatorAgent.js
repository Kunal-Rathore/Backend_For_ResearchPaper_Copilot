

function runPipeline(query) {

    // call all agents

    return {
        answer: "AI-powered summary for your query...",
        papers: [
            { paperId: "arxiv123", title: "Paper Title", authors: ["Author NUMBERFC.com"], url: "link" },

            { paperId: "arxiv456", title: "Another Paper", authors: ["Author Someone2"], url: "link" }
        ],
        summary: "This paper discusses...",
        validation: {
            isValid: true,
            score: 0.95,
            feedback: "Validated successfully",
            citations: ["arxiv123", "arxiv456"]
        }
    }
}

module.exports = { runPipeline };