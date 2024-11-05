from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup
import time

app = Flask(__name__)

# CORS 설정 단순화
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/api/getClubUrls', methods=['GET', 'OPTIONS'])
def get_club_urls():
    # OPTIONS 요청 처리
    if request.method == 'OPTIONS':
        return '', 200
        
    print("GET /api/getClubUrls 요청 받음")
    try:
        # 절대 경로 사용
        with open('club_urls.json', 'r', encoding='utf-8') as f:
            club_data = json.load(f)
        print("데이터 로드 성공:", club_data)
        return jsonify(club_data)
    except Exception as e:
        print(f"Error in get_club_urls: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/scrapeClubs', methods=['POST'])
def scrape_clubs():
    print("POST /api/scrapeClubs 요청 받음")
    try:
        clubs_data = request.json
        results = {}
        
        for club in clubs_data:
            try:
                print(f"Scraping {club['name']}...")
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
                response = requests.get(club['url'], headers=headers, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # 버튼 텍스트 검색
                found_text = None
                status = 'OFF'  # 기본값을 OFF로 설정

                if 'button_selector' in club:
                    # 특정 선택자가 있는 경우
                    button = soup.select_one(club['button_selector'])
                    if button:
                        found_text = button.get_text().strip()
                        if club['button_text'].lower() in found_text.lower():
                            status = 'ON'
                else:
                    # 모든 버튼과 링크에서 텍스트 찾기
                    buttons = soup.find_all(['button', 'a'])
                    for button in buttons:
                        text = button.get_text().strip()
                        if club['button_text'].lower() in text.lower():
                            found_text = text
                            status = 'ON'
                            break
                
                # 특정 키워드가 있으면 무조건 OFF로 변경
                if found_text and any(keyword in found_text.lower() for keyword in ['마감', '종료', '완료', '지난']):
                    status = 'OFF'
                
                results[club['name']] = {
                    'url': club['url'],
                    'status': status,
                    'found_text': found_text
                }
                
                print(f"Scraped {club['name']}: Status={status}, Text={found_text}")
                time.sleep(1)  # 서버 부하 방지
                
            except Exception as e:
                print(f"Error scraping {club['name']}: {e}")
                results[club['name']] = {
                    'url': club['url'],
                    'status': 'ERROR',
                    'error': str(e)
                }
        
        print("Scraping results:", results)
        return jsonify(results)
        
    except Exception as e:
        print(f"Error in scrape_clubs: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "API is working!"})

if __name__ == '__main__':
    print("서버 시작: http://127.0.0.1:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)
