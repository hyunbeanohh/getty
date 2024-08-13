import requests
from bs4 import BeautifulSoup
import json

def check_button_status(url, button_text):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    button = soup.find('button', text=button_text)
    
    if button:
        return True
    else:
        return False

def main():
    # 하드코딩된 URL 리스트 간략화 필요
    urls = [
        {"url": "https://example.com/pageA", "button_text": "지원 모집"},
        {"url": "https://example.com/pageB", "button_text": "지원 모집"},
        {"url": "https://example.com/pageC", "button_text": "지원 모집"},
    ]
    
    results = {}
    
    for item in urls:
        status = check_button_status(item['url'], item['button_text'])
        if status is not None:
            results[item['url']] = status
        else:
            results[item['url']] = "Error"
    
    with open('button_status.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)
    
    print("Scraping completed and data saved to button_status.json.")

if __name__ == "__main__":
    main()
