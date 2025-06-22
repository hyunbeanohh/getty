import { useState, useRef, useEffect } from 'react';
import { clubData } from '@/data/clubData';
import { Filter, Search } from 'lucide-react';

interface ClubFilterProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (searchTerm: string) => void;
}

const ClubFilter = ({ onFilterChange, onSearchChange }: ClubFilterProps) => {

  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showTooltip, setShowTooltip] = useState(false);
  
  // 스크롤 위치 저장을 위한 ref
  const scrollPositionRef = useRef<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색어 변경 시 스크롤 위치 저장 및 복원
  const handleSearchChange = (newSearchTerm: string) => {
    // 현재 스크롤 위치 저장
    scrollPositionRef.current = window.scrollY;
    
    setSearchTerm(newSearchTerm);
    
    // 최소 2글자 이상일 때만 검색 실행
    if (newSearchTerm.length >= 2) {
      onSearchChange(newSearchTerm);
    } else {
      // 2글자 미만일 때는 빈 문자열 전달 (전체 목록 표시)
      onSearchChange('');
    }
  };

  // 검색어 변경 후 스크롤 위치 복원
  useEffect(() => {
    if (scrollPositionRef.current > 0) {
      // 다음 프레임에서 스크롤 위치 복원
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [searchTerm]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className="mt-10 mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">전체 동아리</h2>
                <span className="text-gray-500 text-lg">({clubData.length}개)</span>
            </div>

        {/* 검색 */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="동아리, 포지션 검색..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-12 pr-6 py-3 w-80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                />
        </div>

            {/* 고급 필터 토글 */}
            <div 
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 relative left-[50px] bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                >
                  <Filter className="w-5 h-5" />
                  필터
              </button>
              
              {/* 커스텀 툴팁 */}
              {showTooltip && (
                <div className="absolute top-full left-[90px] transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10 whitespace-nowrap">
                  아직 준비중인 기능이에요!
                  <div className="absolute bottom-full left-[90px] transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>

            {/* 기본 필터 */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="bg-transparent border-none px-4 py-2 focus:ring-0 focus:outline-none text-gray-700 font-medium"
                >
                  <option value="all">모집 여부</option>
                  <option value="recruiting">모집중</option>
                  <option value="closed">모집마감</option>
                </select>
              </div>
        </div>
    </div>
  )
}

export default ClubFilter