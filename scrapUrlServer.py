from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

@app.route('/api/getData', methods=['GET'])
def get_buttons():
    with open('button_texts.json') as f:
        button_texts = json.load(f)
    return jsonify(button_texts)

@app.route('/api/scrapeClubs', methods=['POST'])
def scrape_clubs():
    clubs = request.json
    results = {}

    for club in clubs:
        status = check_application_status(
            club['url'], 
            club['button_text'],
            club.get('button_selector')
        )
        results[club['name']] = {
            "url": club['url'],
            "status": status
        }

    with open('scraping_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

    return jsonify({"status": "success"})

@app.route('/api/getResults', methods=['GET'])
def get_results():
    with open('scraping_results.json', 'r', encoding='utf-8') as f:
        results = json.load(f)
    return jsonify(results)

def check_application_status(url, button_text, button_selector=None):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return "Error"

    soup = BeautifulSoup(response.text, 'html.parser')
    button = None
    
    if button_selector:
        if button_selector.startswith('#'):
            button = soup.find(id=button_selector[1:])
        elif button_selector.startswith('.'):
            button = soup.find(class_=button_selector[1:])
    
    if not button:
        button = soup.find('button', text=button_text)
    
    return "ON" if button else "OFF"

if __name__ == '__main__':
    app.run(debug=True)
