from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()
summarizer = pipeline("summarization", model="arpit-sri/news-sum")

@app.get("/")

class TextInput(BaseModel):
    text: str

def summarize_text(input_data: TextInput):
    text = input_data.text
    summary = summarizer(text, max_length=100, min_length=40, do_sample=False)
    return summary[0]['summary_text']

