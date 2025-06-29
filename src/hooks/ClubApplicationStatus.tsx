import React, { useState, useEffect } from 'react';
import { Club } from '@/types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

interface ClubStatus {
  [key: string]: {
    url: string;
    status: string;
  };
}

interface ClubApplicationStatusProps {
  club: Club;
}

export const ClubApplicationStatus: React.FC<ClubApplicationStatusProps> = ({ club }) => {
  const [clubStatus, setClubStatus] = useState<ClubStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubStatus = async () => {
      try {
        console.log('Fetching club URLs...');
        const response = await fetch(`${API_BASE_URL}/api/getClubUrls`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Club URLs response:', data);

        console.log('Sending scrape request...');
        const scrapeResponse = await fetch(`${API_BASE_URL}/api/scrapeClubs`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
