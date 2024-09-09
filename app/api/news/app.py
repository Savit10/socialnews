from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from newsapi import NewsApiClient

app = FastAPI()
summarizer = pipeline("summarization", model="arpit-sri/news-sum")

@app.get("/")

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

def summarize_text(input_data: TextInput):
    text = input_data.text
    
    if not text:
        raise HTTPException(status_code=400, detail="Text input is required")
    
    summary = summarizer(text, max_length=100, min_length=40, do_sample=False)
    
    return summary[0]['summary_text']

def return_summary(urls):
    urls = get_url('business', 'us')
    results = []
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