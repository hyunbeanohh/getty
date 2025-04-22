# 동아리 모집 정보 모니터링 서비스

## 프로젝트 소개
대학생 개발 동아리들의 모집 정보를 실시간으로 모니터링하고, 모집 상태를 한눈에 확인할 수 있는 서비스입니다.

## 주요 기능
- 동아리 모집 상태 실시간 모니터링
- 자동 스크롤 애니메이션을 통한 동아리 정보 표시
- 모집 중인 동아리 즉시 확인
- 반응형 디자인으로 다양한 디바이스 지원

## 기술 스택
- **프론트엔드**
  - TypeScript
  - Tailwind CSS
  - React Hooks

- **백엔드**
  - Python 3.x
  - FastAPI (또는 Flask)
  - Selenium/BeautifulSoup (웹 스크래핑)
  - JSON 데이터 관리

## 프로젝트 구조

## Get It Club Information (getty)
🎉IT 동아리를 알아보기 위해 귀찮게 검색하지말고 한번에 홈페이지로 보자!

## 개발 환경
- **JavaScript Framework**: React 18+
- **Programming Language**: TypeScript
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS

## 설치 및 실행 방법
1. 저장소 클론
```bash
git clone [repository-url]
```

2. 프론트엔드 의존성 설치
```bash
cd client
npm install
# or
yarn install
```

3. 백엔드 환경 설정
```bash
cd server
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

4. 개발 서버 실행
```bash
# 프론트엔드
cd client
npm run dev
# or
yarn dev

# 백엔드
cd server
python scrapUrlServer.py
```

## 환경 변수 설정
```env
# 프론트엔드
VITE_API_URL=http://localhost:8000

# 백엔드
PYTHONPATH=.
```