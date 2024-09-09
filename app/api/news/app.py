from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from newsapi import NewsApiClient
from bs4 import BeautifulSoup
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the specific domain of your Next.js app in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline("summarization", model="arpit-sri/news-sum")

class TextInput(BaseModel):
    text: str

def get_url(category, country):
    newsapi = NewsApiClient(api_key='2e9e4dcd8aaa426794955186ce972759')
    top_headlines = newsapi.get_top_headlines(q='bitcoin',
                                              category=category,
                                              language='en',
                                              country=country)
    urls = [article['url'] for article in top_headlines['articles']]
    return urls

def scrape_article(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  
        
        soup = BeautifulSoup(response.content, 'html.parser')

        title = soup.find('h1').get_text()

        paragraphs = soup.find_all('p')
        content = ' '.join([p.get_text() for p in paragraphs])

        return {'title': title, 'content': content}

    except Exception as e:
        return f"Error occurred: {e}"

def get_recommendations(user_topics):
    vectorizer = TfidfVectorizer()
    categories = ['CULTURE & ARTS', 'HEALTHY LIVING', 'STYLE', 'WORLDPOST', 'U.S. NEWS', 'QUEER VOICES', 'GOOD NEWS', 'WOMEN', 'MEDIA', 'LATINO VOICES', 'COLLEGE', 'TASTE', 'DIVORCE', 'STYLE & BEAUTY', 'POLITICS', 'MONEY', 'THE WORLDPOST', 'PARENTS', 'SCIENCE', 'RELIGION', 'WELLNESS', 'IMPACT', 'TECH', 'BUSINESS', 'CRIME', 'WEIRD NEWS', 'WORLD NEWS', 'ARTS & CULTURE', 'ENVIRONMENT', 'PARENTING', 'FOOD & DRINK', 'FIFTY', 'HOME & LIVING', 'COMEDY', 'SPORTS', 'GREEN', 'EDUCATION', 'ENTERTAINMENT', 'WEDDINGS', 'BLACK VOICES', 'ARTS', 'TRAVEL']
    category_embeddings = vectorizer.fit_transform(categories).toarray()
    user_embeddings = vectorizer.transform(user_topics).toarray()
    similarities = cosine_similarity(user_embeddings, category_embeddings)
    average_similarity = np.mean(similarities, axis=0)
    recommended_indices = np.argsort(average_similarity)[::-1]  
    recommended_categories = np.array(categories)[recommended_indices]
    recommendations = []
    for category in recommended_categories:
        if category not in user_topics:
            recommendations.append(category)
    top_5_recommendations = list(set(recommendations))[:5]
    for topics in user_topics:
        if topics not in top_5_recommendations:
            top_5_recommendations.append(topics)
    return top_5_recommendations

def return_summary(urls):
    urls = get_url('business', 'us')
    results = []
    user_categories = [] 
    recommended_topics = get_recommendations(user_categories)
    for url in urls:
        article = scrape_article(url)
        title = {article['title']}
        content = {article['content']}
        summary = summarize_text(content)
        results.append({
            'title': title,
            'summary': summary
        })
    return results

@app.post("/summarize")
async def summarize_text(input_data: TextInput):
    try:
        text = input_data.text
        summary = summarizer(text, max_length=100, min_length=40, do_sample=False)
        return {"summary": summary[0]['summary_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))