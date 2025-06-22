import { useState, useEffect, useCallback } from 'react';

interface ClubStatus {
  [key: string]: {
    url: string;
    status: 'ON' | 'OFF' | 'ERROR';
    found_text?: string;
    error?: string;
  };
}

export const useClubStatus = () => {
  const [clubStatus, setClubStatus] = useState<ClubStatus>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClubStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 먼저 클럽 URL 목록을 가져옵니다
      const urlsResponse = await fetch('http://127.0.0.1:5000/api/getClubUrls');
      if (!urlsResponse.ok) {
        throw new Error('클럽 URL 목록을 가져오는데 실패했습니다.');
      }
      
      const clubUrls = await urlsResponse.json();
      
      // 크롤링 요청을 보냅니다
      const scrapeResponse = await fetch('http://127.0.0.1:5000/api/scrapeClubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clubUrls),
      });
      
      if (!scrapeResponse.ok) {
        throw new Error('클럽 상태 크롤링에 실패했습니다.');
      }
      
      const statusData = await scrapeResponse.json();
      setClubStatus(statusData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('클럽 상태 가져오기 오류:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClubStatus();
  }, [fetchClubStatus]);

  const getClubStatus = (clubName: string): 'ON' | 'OFF' => {
    const status = clubStatus[clubName]?.status;
    if (status === 'ON') return 'ON';
    if (status === 'OFF') return 'OFF';
    return 'OFF'; // 기본값 또는 에러 시 OFF
  };

  const refreshStatus = () => {
    fetchClubStatus();
  };

  return {
    clubStatus,
    loading,
    error,
    getClubStatus,
    refreshStatus,
  };
}; 