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
        else:
            current_clicks = int(current_clicks)  # 문자열을 정수로 변환
        
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

@app.route('/api/getAllClickCounts', methods=['GET', 'OPTIONS'])
def get_all_click_counts():
    if request.method == 'OPTIONS':
        return '', 200
    logging.info("GET /api/getAllClickCounts 요청 받음")
    try:
        with open('server/club_urls.json', 'r', encoding='utf-8') as f:
            clubs_data = json.load(f)
        
        club_names = [club['name'] for club in clubs_data]
        
        clicks_data = {}
        for name in club_names:
            current_clicks = redis_client.get(name)
            if current_clicks is None:
                clicks_data[name] = 0
            else:
                clicks_data[name] = int(current_clicks)
        
        return jsonify(clicks_data)
        
    except Exception as e:
        logging.error(f"Error in getAllClickCounts: {e}")
        return jsonify({"error": str(e)}), 500

def extract_status(soup, club):
    """
    클럽 페이지에서 상태를 추출합니다.
    긍정 키워드를 포함하고 부정 키워드를 포함하지 않는 버튼/링크를 찾아 상태를 결정합니다.
    """
    # 모집 중을 나타내는 키워드 (긍정)
    ON_KEYWORDS = ['지원하기', '참여하기', '등록하기', 'apply', 'join', '모집중', '신청하기']
    
    # 모집 마감을 나타내는 키워드 (부정)
    OFF_KEYWORDS = [
        '마감', '종료', '완료', '지난', 'closed', 'ended', '마감되었습니다', 
        '모집 종료', '알림', '소식', '다음 기수', 'notify', 'coming soon', 'previous'
    ]

    status = 'OFF'  # 기본 상태는 'OFF'
    found_text = None

    # 분석할 대상 버튼/링크 선택
    elements_to_check = []
    if 'button_selector' in club and club['button_selector']:
        # selector가 여러 요소를 찾을 수 있도록 select로 변경
        selected_elements = soup.select(club['button_selector'])
        if selected_elements:
            elements_to_check = selected_elements
    
    if not elements_to_check:
        elements_to_check = soup.find_all(['button', 'a'])

    # 로깅을 위해 모든 유의미한 텍스트를 수집
    possible_texts = [elem.get_text().strip() for elem in elements_to_check if elem.get_text().strip()]

    # 선택된 요소들을 순회하며 상태 분석
    for element in elements_to_check:
        text = element.get_text().lower().strip()
        if not text:
            continue

        # 키워드 존재 여부 확인
        has_on_keyword = any(kw in text for kw in ON_KEYWORDS)
        has_off_keyword = any(kw in text for kw in OFF_KEYWORDS)

        # '신청하기'가 있지만 '알림' 또는 '소식'이 포함된 경우, 긍정 키워드로 보지 않음
        if '신청하기' in text and ('알림' in text or '소식' in text):
            has_on_keyword = False

        # 긍정 키워드는 있고 부정 키워드가 없을 때 'ON'으로 판단
        if has_on_keyword and not has_off_keyword:
            status = 'ON'
            found_text = element.get_text().strip()
            # 가장 확실한 'ON' 신호를 찾았으므로 루프 중단
            break
    
    # 'ON' 상태를 찾지 못했다면, 로깅을 위해 첫 번째 텍스트를 사용
    if status == 'OFF' and possible_texts:
        found_text = possible_texts[0]

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
