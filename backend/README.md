
# 🎬 YouTube Video Summarizer – Backend

This is the backend service for the YouTube Video Summarizer app. It extracts the transcript of a given YouTube video and summarizes it using OpenAI's GPT models. Built using FastAPI.

---

## 🚀 Features

- Extracts transcripts from YouTube videos
- Supports optional custom system prompts for summarization
- Uses OpenAI's GPT (e.g., GPT-4o) to generate clear, Markdown-formatted summaries
- Exposes a REST API endpoint consumable by frontend apps

---

## 🧱 Folder Structure

```text
backend/
├── youtube_summary_api.py              # FastAPI app with summarization endpoint
├── .env                 # Environment variables (API keys, etc.)
├── requirements.txt     # Python dependencies


---
```
## ⚙️ Requirements

- Python 3.8+
- OpenAI API key
- Internet access (to fetch YouTube transcripts)

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/youtube-summarizer.git
cd youtube-summarizer/backend
```

### 2. Create and Activate Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install Dependencies

```bash
pip3 install -r requirements.txt
```

### 4. Add Environment Variables

Create a .env file and add your OpenAI key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 5. Run the App

```bash
uvicorn main:app --reload
```
The backend will be available at:
👉 http://127.0.0.1:8000


## 🧪 API Endpoint

### POST /summarize

Request Body:
```bash
{
  "url": "https://www.youtube.com/watch?v=your_video_id",
  "system_prompt": "optional_custom_prompt"
}
```

Response:
```bash
{
  "summary": "Your summarized content in Markdown format"
}
```


## 🧰 Tech Stack

- FastAPI
- OpenAI Python SDK
- YouTube Transcript API
- Uvicorn
- dotenv

## 📄 License
This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details..
Feel free to modify and reuse with attribution.

## ✨ Author
Akhil Kakar