import os
import re
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from openai import OpenAI

# Load API Key from .env
load_dotenv(override=True)
api_key = os.getenv('OPENAI_API_KEY')

# Initialize OpenAI
openai_client = OpenAI()

# FastAPI setup
app = FastAPI()

# Optional: CORS middleware for frontend support (React, Vue, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You should restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class SummaryRequest(BaseModel):
    youtube_url: str
    system_prompt: str = None  # Optional custom prompt

# Extract video ID
def extract_video_id(url: str) -> str:
    regex = r"(?:v=|be/)([a-zA-Z0-9_-]{11})"
    match = re.search(regex, url)
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid YouTube URL")

# Get transcript from YouTube
def get_transcript(video_id: str) -> str:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([item['text'] for item in transcript])
    except Exception as e:
        raise RuntimeError(f"Transcript error: {e}")

# Default prompt for summarization
DEFAULT_PROMPT = """
You are a skilled explainer and storyteller who specializes in summarizing YouTube video transcripts in a way that's both engaging and informative. 
Your task is to:
- Capture key points and main ideas of the video
- Structure your summary with clear sections
- Include important details, facts, and figures mentioned
- Never end your summary with a "Conclusion" section
- Keep the summary short and easy to understand
- Format your response in markdown
"""

# Get summary using OpenAI
def get_summary(transcript: str, system_prompt: str) -> str:
    try:
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Summarize the following YouTube video transcript:\n\n{transcript}"}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        raise RuntimeError(f"OpenAI summarization error: {e}")

# API route
@app.post("/summarize")
def summarize_video(request: SummaryRequest):
    try:
        video_id = extract_video_id(request.youtube_url)
        transcript = get_transcript(video_id)
        prompt = request.system_prompt or DEFAULT_PROMPT
        summary = get_summary(transcript, prompt)
        return {"summary": summary}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=500, detail=str(re))
