import { useState, useEffect } from 'react';
import { ClubStatusMap } from '../../../types/types';

export const useClubStatus = (clubs: { id: string; target: string }[]) => {
  const [loading, setLoading] = useState(false);
  const [clubStatus, setClubStatus] = useState<ClubStatusMap>({});

  useEffect(() => {
    const fetchClubStatus = async () => {
      try {
        const response = await fetch('/api/scrapeClubs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clubs.map(club => ({
            name: club.id,
            url: club.target,
            button_text: '지원'
          }))),
        });
        const data = await response.json();
        setClubStatus(data);
      } catch (error) {
        console.error('Error fetching club status:', error);
      } finally {
        setLoading(true);
      }
    };

    fetchClubStatus();
  }, [clubs]);

  return { loading, clubStatus };
};