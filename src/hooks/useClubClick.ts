import { useState, useEffect } from 'react';
import { UseClubClickProps } from '@/types/types';



export const useClubClick = ({ clubName }: UseClubClickProps) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = async () => {
    try {
      const response = await fetch('/api/incrementClick', {
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
    const response = await fetch(`/api/getClickCount?club_name=${clubName}`);
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