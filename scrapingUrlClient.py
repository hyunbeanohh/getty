import requests
from bs4 import BeautifulSoup
import json

def check_application_status(url, button_text):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return "Error"

    soup = BeautifulSoup(response.text, 'html.parser')
    button = soup.find('button', text=button_text)
    
    if button:
        return "ON"
    else:
        return "OFF"

def main():
    # 서버에서 IT 동아리 URL 목록 가져오기
    server_url = "http://localhost:5000"
    response = requests.get(f"{server_url}/api/getClubUrls")
    clubs = response.json()
    
    results = {}
    
    for club in clubs:
        status = check_application_status(club['url'], club['button_text'])
        results[club['name']] = {
            "url": club['url'],
            "status": status
        }
    
    # 결과를 서버에 저장
    requests.post(f"{server_url}/api/saveResults", json=results)
    
    print("Scraping completed and data saved to server.")

if __name__ == "__main__":
    main()
