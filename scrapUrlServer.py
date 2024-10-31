from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
# CORS 설정을 더 구체적으로 지정
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],  # React 개발 서버 주소
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"]
    }
})

@app.route('/api/getClubUrls', methods=['GET', 'OPTIONS'])
def get_club_urls():
    # OPTIONS 요청 처리
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response

    print("GET /api/getClubUrls 요청 받음")
    try:
        with open('club_urls.json', 'r', encoding='utf-8') as f:
            club_data = json.load(f)
        print("데이터 로드 성공:", club_data)
        response = jsonify(club_data)
        # CORS 헤더 직접 설정
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response
    except Exception as e:
        print(f"Error in get_club_urls: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/test', methods=['GET', 'OPTIONS'])
def test():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response
        
    response = jsonify({"message": "API is working!"})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    return response

if __name__ == '__main__':
    print("서버 시작: http://localhost:5000")
    app.run(debug=True, port=5000)
