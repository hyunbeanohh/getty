import { clubData, Club } from "@/data/clubData";
import { useMemo, useState } from "react";
import { X } from 'lucide-react';

interface ClubFilterViewProps {
  onFilteredClubs: (clubs: Club[]) => void;
  searchTerm: string;
  filter: string;
  showFilters: boolean;
  onClose: () => void;
}

const ClubFilterView = ({ 
  onFilteredClubs, 
  searchTerm, 
  filter, 
  showFilters, 
  onClose 
}: ClubFilterViewProps) => {
  // 필터 상태
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  // 모든 기술스택과 포지션 목록 추출
  const allTechStacks = useMemo(() => 
    [...new Set(clubData.flatMap(club => club.techStack))].sort()
  , []);

  const allPositions = useMemo(() => 
    [...new Set(clubData.flatMap(club => club.positions))].sort()
  , []);

  // 필터링 로직
  const filteredClubs = useMemo(() => {
    let filtered = clubData.filter(club => {
      // 검색어 필터
      const matchesSearch = searchTerm === '' || 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        club.positions.some(pos => pos.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // 기술스택 필터
      const matchesTechStack = selectedTechStack.length === 0 || 
        selectedTechStack.some(tech => club.techStack.includes(tech));
      
      // 포지션 필터
      const matchesPosition = selectedPositions.length === 0 ||
        selectedPositions.some(pos => club.positions.includes(pos));
      
      return matchesSearch && matchesTechStack && matchesPosition;
    });

    return filtered;
  }, [searchTerm, selectedTechStack, selectedPositions]);

  // 필터 변경 시 부모 컴포넌트에 결과 전달
  useMemo(() => {
    onFilteredClubs(filteredClubs);
  }, [filteredClubs, onFilteredClubs]);

  // 기술스택 토글
  const toggleTechStack = (tech: string) => {
    setSelectedTechStack(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // 포지션 토글
  const togglePosition = (position: string) => {
    setSelectedPositions(prev => 
      prev.includes(position) 
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  // 필터 초기화
  const resetFilters = () => {
    setSelectedTechStack([]);
    setSelectedPositions([]);
  };

  if (!showFilters) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">상세 필터</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* 기술스택 섹션 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-800 mb-3">기술스택</h4>
        <div className="flex flex-wrap gap-2">
          {allTechStacks.map(tech => (
            <button
              key={tech}
              onClick={() => toggleTechStack(tech)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTechStack.includes(tech)
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* 모집 포지션 섹션 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-800 mb-3">모집 포지션</h4>
        <div className="flex flex-wrap gap-2">
          {allPositions.map(position => (
            <button
              key={position}
              onClick={() => togglePosition(position)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                selectedPositions.includes(position)
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 초기화 버튼 */}
      <div className="flex justify-end gap-3">
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default ClubFilterView;