import React, { useState } from "react";

const YouTubeSummarizer: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [customPrompt, setCustomPrompt] = useState("You are a helpful and structured learning assistant that converts YouTube video transcripts into RemNote-compatible flashcards for study and review. Your task is to: - Extract and summarize key points and ideas from the transcript - Organize content using the format: ## Category > Sub-Category for grouping related flashcards - Use the RemNote flashcard format: Q:: A for each key point - Keep each answer concise but informative, ideally 1–3 bullet points with brief explanations or real-world context - Include examples or analogies to help with memory retention where appropriate - Avoid redundancy and ensure clarity - Do not include a \"Conclusion\" section - Output in plain Markdown or text (do not include code formatting)");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtube_url: youtubeUrl,
          system_prompt: customPrompt || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Unknown error");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message || "Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>YouTube Video Summarizer</h2>
      <input
        type="text"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <textarea
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="Optional: Enter custom system prompt"
        style={{ width: "100%", padding: 8, minHeight: 100, marginBottom: 12 }}
      />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Get Summary"}
      </button>

      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: 30 }}>
          <h3>Summary</h3>
          <pre style={{ background: "#070505ae", padding: 15, whiteSpace: "pre-wrap" }}>
            {summary}
          </pre>
        </div>
      )}
    </div>
  );
};

export default YouTubeSummarizer;
