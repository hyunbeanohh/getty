import { useMemo } from 'react';
import { clubData, Club } from '@/data/clubData';

interface UseClubSearchProps {
  searchTerm: string;
}

export const useClubSearch = ({ searchTerm }: UseClubSearchProps) => {
  const filteredClubs = useMemo(() => {
    if (!searchTerm) {
      return clubData;
    }

    return clubData.filter(club => 
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.positions.some(position => position.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return {
    filteredClubs,
    hasSearchTerm: searchTerm.length > 0,
    searchResultCount: filteredClubs.length,
    totalCount: clubData.length
  };
}; 