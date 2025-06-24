import { useState, useEffect } from 'react';
import { UseClubClickProps } from '@/types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const useClubClick = ({ clubName }: UseClubClickProps) => {
  const [clicks, setClicks] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/incrementClick`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ club_name: clubName }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to increment click');
      }
    } catch (error) {
      console.error('Error incrementing click:', error);
    }
  };

  const fetchClickCount = async () => {
    const response = await fetch(`${API_BASE_URL}/api/getClickCount?club_name=${clubName}`);
    const data = await response.json();
    if (response.ok) {
      setClicks(data.clicks);
    }
  };

  useEffect(() => {
    fetchClickCount();
  }, [clubName]);

  return {
    clicks,
    handleClick,
  };
}; 