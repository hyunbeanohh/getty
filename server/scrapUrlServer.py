from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup
import time
import logging
import redis
from apscheduler.schedulers.background import BackgroundScheduler

# Redis 클라이언트 설정
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # 모든 출처 허용

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def update_click_counts():
    """Redis에서 클릭 수를 가져와서 데이터베이스에 업데이트하는 함수."""
    logging.info("클릭 수 업데이트 시작")
    try:
        # club_urls.json 파일에서 클럽 이름을 가져오는 로직
        with open('server/club_urls.json', 'r', encoding='utf-8') as f:
            club_data = json.load(f)
        
        for club in club_data:
            club_name = club['name']  # 클럽 이름 가져오기
            current_clicks = redis_client.get(club_name)
            if current_clicks is not None:
                # 데이터베이스에 클릭 수 업데이트하는 로직
                # 예: db.update_click_count(club_name, current_clicks)
                logging.info(f"{club_name} 클릭 수 업데이트: {current_clicks}")
    except Exception as e:
        logging.error(f"클릭 수 업데이트 중 오류 발생: {e}")

# 스케줄러 설정
scheduler = BackgroundScheduler()
scheduler.add_job(update_click_counts, 'interval', minutes=10)  # 5분 간격으로 실행
scheduler.start()

@app.route('/api/incrementClick', methods=['POST', 'OPTIONS'])
def increment_click():
    if request.method == 'OPTIONS':
        return '', 200  # CORS preflight response
    logging.info("POST /api/incrementClick 요청 받음")
    try:
        club_name = request.json.get('club_name')
        if not club_name:
            return jsonify({"error": "club_name is required"}), 400
        
        # Redis에서 클릭 수 증가
        redis_client.incr(club_name)
        current_clicks = redis_client.get(club_name)  # 현재 클릭 수 가져오기
        
        logging.info(f"{club_name} 클릭 수 증가: {current_clicks}")
        return jsonify({"club_name": club_name, "clicks": current_clicks})
        
    except Exception as e:
        logging.error(f"Error in increment_click: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/getClickCount', methods=['GET', 'OPTIONS'])
def get_click_count():
    if request.method == 'OPTIONS':
        return '', 200  # CORS preflight response
    logging.info("GET /api/getClickCount 요청 받음")
    try:
        club_name = request.args.get('club_name')
        if not club_name:
            return jsonify({"error": "club_name is required"}), 400
        
        # Redis에서 클릭 수 가져오기
        current_clicks = redis_client.get(club_name)
        
        if current_clicks is None:
            current_clicks = 0  # 클릭 수가 없으면 0으로 설정
        
        logging.info(f"{club_name} 클릭 수: {current_clicks}")
        return jsonify({"club_name": club_name, "clicks": current_clicks})
        
    except Exception as e:
        logging.error(f"Error in get_click_count: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/getClubUrls', methods=['GET', 'OPTIONS'])
def get_club_urls():
    if request.method == 'OPTIONS':
        return '', 200  # CORS preflight response
        
    logging.info("GET /api/getClubUrls 요청 받음")
    try:
        with open('club_urls.json', 'r', encoding='utf-8') as f:
            club_data = json.load(f)
        logging.info(f"데이터 로드 성공: {club_data}")
        return jsonify(club_data)
    except Exception as e:
        logging.error(f"Error in get_club_urls: {e}")
        return jsonify({"error": str(e)}), 500

def extract_status(soup, club):
    """클럽 페이지에서 버튼 텍스트를 추출하여 상태를 결정하는 함수."""
    found_text = None
    status = 'OFF'  # 기본 상태 OFF
    # 특정 선택자가 명시된 경우
    if 'button_selector' in club:
        button = soup.select_one(club['button_selector'])
        if button:
            found_text = button.get_text().strip()
            if club['button_text'].lower() in found_text.lower():
                status = 'ON'
    else:
        # 모든 button, a 태그 탐색
        buttons = soup.find_all(['button', 'a'])
        for button in buttons:
            text = button.get_text().strip()
            if club['button_text'].lower() in text.lower():
                found_text = text
                status = 'ON'
                break
    
    # 특정 키워드가 발견되면 상태를 OFF로 강제 변경
    if found_text and any(keyword in found_text.lower() for keyword in ['마감', '종료', '완료', '지난','만나요!','마감되었습니다.']):
        status = 'OFF'
    return status, found_text

@app.route('/api/scrapeClubs', methods=['POST', 'OPTIONS'])
def scrape_clubs():
    if request.method == 'OPTIONS':
        return '', 200  # CORS preflight response
    logging.info("POST /api/scrapeClubs 요청 받음")
    try:
        clubs_data = request.json
        results = {}
        # 세션을 이용하여 연결 재사용
        session = requests.Session()
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                          '(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        for club in clubs_data:
            try:
                logging.info(f"Scraping {club['name']}...")
                response = session.get(club['url'], headers=headers, timeout=10)
                response.raise_for_status()  # HTTP 에러 발생 시 예외 처리
                soup = BeautifulSoup(response.text, 'html.parser')
                
                status, found_text = extract_status(soup, club)
                
                results[club['name']] = {
                    'url': club['url'],
                    'status': status,
                    'found_text': found_text
                }
                
                logging.info(f"Scraped {club['name']}: Status={status}, Text={found_text}")
                time.sleep(1)  # 서버 부하 방지
                
            except Exception as e:
                logging.error(f"Error scraping {club['name']}: {e}")
                results[club['name']] = {
                    'url': club['url'],
                    'status': 'ERROR',
                    'error': str(e)
                }
        
        logging.info(f"Scraping results: {results}")
        return jsonify(results)
        
    except Exception as e:
        logging.error(f"Error in scrape_clubs: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "API is working!"})

if __name__ == '__main__':
    logging.info("서버 시작: http://127.0.0.1:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)
