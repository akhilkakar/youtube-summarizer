import React, { useState } from "react";

const YouTubeSummarizer: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
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
