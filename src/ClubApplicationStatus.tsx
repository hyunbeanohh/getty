import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ClubStatus {
  [key: string]: {
    url: string;
    status: string;
  };
}

function ClubApplicationStatus() {
  const [clubStatus, setClubStatus] = useState<ClubStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getClubUrls');
        const clubs = response.data;

        // 서버에 크롤링 요청
        await axios.post('http://localhost:5000/api/scrapeClubs', clubs);

        // 크롤링 결과 가져오기
        const resultsResponse = await axios.get('http://localhost:5000/api/getResults');
        setClubStatus(resultsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchClubStatus();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!clubStatus) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <h2>동아리 지원 현황</h2>
      <ul>
        {Object.entries(clubStatus).map(([clubName, info]) => (
          <li key={clubName}>
            <strong>{clubName}</strong>: {info.status === 'ON' ? '지원 중' : '지원 마감'} 
            (<a href={info.url} target="_blank" rel="noopener noreferrer">홈페이지</a>)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubApplicationStatus;
