import React, { useState, useEffect } from 'react';

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
        console.log('Fetching club URLs...');
        const response = await fetch('/api/getClubUrls', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:5173',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Club URLs response:', data);

        console.log('Sending scrape request...');
        const scrapeResponse = await fetch('/api/scrapeClubs', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:5173',
          },
          body: JSON.stringify(data),
        });

        if (!scrapeResponse.ok) {
          throw new Error(`HTTP error! status: ${scrapeResponse.status}`);
        }
        
        const scrapeData = await scrapeResponse.json();
        console.log('Scrape response:', scrapeData);

        setClubStatus(scrapeData);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err);
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
