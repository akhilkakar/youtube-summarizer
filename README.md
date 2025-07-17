# YouTube Summarizer

A full-stack application to generate AI-powered summaries of YouTube videos. Built with:

- **Frontend**: React + TypeScript
- **Backend**: Python + FastAPI

---

## 🗂 Project Structure

```
youtube-summarizer/
├── backend/               # FastAPI backend
│   ├── youtube_summary_api.py
│   ├── requirements.txt
│   └── .env
│
├── youtube-summarizer/    # Frontend React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── README.md              # This file
```

---

## 🚀 Quick Start

### 🔧 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up your `.env` file with any required keys (if needed)

5. Run the backend:

   ```bash
   uvicorn main:app --reload
   ```

---

### 💻 Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd youtube-summarizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

---

## 🌐 Usage

1. Paste a YouTube video URL in the input field.
2. Optionally enter a custom system prompt (e.g., “Summarize in RemNote format”).
3. Click **Summarize**.
4. View and copy the generated summary.

---

## 🧩 Technologies Used

- FastAPI
- React + TypeScript
- Fetch API
- Python 3
- OpenAI API (if configured)
- Vite

---

## 📜 License

MIT License
