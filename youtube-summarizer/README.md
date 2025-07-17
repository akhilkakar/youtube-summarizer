# 🎥 YouTube Summarizer – Frontend

This is the frontend React application for the **YouTube Video Summarizer**, which allows users to input a YouTube video link and (optionally) a custom prompt, then receive a concise AI-generated summary of the video transcript. It interacts with a FastAPI backend that uses OpenAI to perform summarization.

---

## 🚀 Features

- ✅ Enter a YouTube video link
- 📝 Optional: Add your own system prompt
- 🧠 View AI-generated summaries in structured format (RemNote style)
- 💡 Built with React + TypeScript for maintainability
- 🔗 Communicates with a FastAPI backend via REST API

---

## 🧱 Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── YouTubeSummarizer.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

> The frontend will be available at:  
> `http://localhost:5173`

---

## 🔧 API Configuration

Ensure that the backend FastAPI server is running (default: `http://localhost:8000`).

If needed, update the backend API URL in `src/components/YouTubeSummarizer.tsx`:

```ts
const response = await fetch('http://localhost:8000/summarize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    youtube_url,
    system_prompt
  }),
});
```

---

## 🧪 Tech Stack

- ⚛️ React (TypeScript)
- ⚡ Vite
- 🌐 REST API with Fetch
- 🧩 Modular Components

---

## 📬 Contact

Made with ❤️ by Akhil.  
Feel free to fork, contribute, and share ideas.