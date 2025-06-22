import { useState, useCallback } from 'react';

interface ClubClicks {
  [key: string]: number;
}

export const useClubClicks = () => {
  const [clubClicks, setClubClicks] = useState<ClubClicks>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClubClicks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://127.0.0.1:5000/api/getAllClickCounts`);
      
      if (response.ok) {
        const data = await response.json();
        setClubClicks(data);
      } else {
        console.error(`Failed to fetch all clicks:`, response.status);
        throw new Error('클릭 수를 가져오는데 실패했습니다.');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('전체 클릭 수 가져오기 오류:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getClubClicks = (clubName: string): number => {
    return clubClicks[clubName] || 0;
  };

  return {
    clubClicks,
    loading,
    error,
    getClubClicks,
    fetchClubClicks,
  };
}; 