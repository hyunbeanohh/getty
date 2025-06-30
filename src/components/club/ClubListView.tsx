import { useState, useMemo, useRef, useEffect } from 'react';
import { clubData, Club, tagColors } from '@/data/clubData';
import ClubFilter from './ClubFilter';
import { Star, Users, Clock, ExternalLink } from 'lucide-react';
import { useClubStatus } from '@/hooks/useClubStatus';
import { useClubClicks } from '@/hooks/useClubClicks';
import { useClubSearch } from '@/hooks/useClubSearch';
import noResultVideo from '@/assets/video/noresult-video.mp4';

const ClubListView = () => {
  const { getClubStatus, loading: statusLoading, error: statusError } = useClubStatus();
  const { getClubClicks, loading: clicksLoading, error: clicksError } = useClubClicks();
  
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredClub, setHoveredClub] = useState<number | null>(null);
  
  // 스크롤 위치 저장을 위한 ref
  const scrollPositionRef = useRef<number>(0);

  // 검색어 필터링
  const { filteredClubs: searchFilteredClubs } = useClubSearch({ searchTerm });

  // 필터링 및 정렬된 동아리 목록
  const filteredAndSortedClubs = useMemo(() => {
    // 현재 스크롤 위치 저장
    scrollPositionRef.current = window.scrollY;
    
    let filteredClubs = searchFilteredClubs;

    // 모집 상태별 필터링
    if (currentFilter === 'recruiting') {
      // 모집중인 동아리만 필터링
      filteredClubs = filteredClubs.filter(club => {
        const status = getClubStatus(club.name);
        return status === 'ON';
      });
    } else if (currentFilter === 'closed') {
      // 모집마감인 동아리만 필터링
      filteredClubs = filteredClubs.filter(club => {
        const status = getClubStatus(club.name);
        return status === 'OFF';
      });
    }

    return filteredClubs;
  }, [searchFilteredClubs, currentFilter, getClubStatus]);

  // 필터링된 결과가 변경된 후 스크롤 위치 복원
  useEffect(() => {
    if (scrollPositionRef.current > 0) {
      // 다음 프레임에서 스크롤 위치 복원
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [filteredAndSortedClubs]);

  const ListView = (club: Club, index: number) => {
    const status = getClubStatus(club.name);
    const clicks = getClubClicks(club.name);
    const isHovered = hoveredClub === club.id;
    const hiddenPositions = club.positions.length >= 4 ? club.positions.slice(3) : [];
    
    return (
      <div 
        key={club.id}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 hover:border-blue-200 opacity-1 animate-fadeInUp"
        style={{
          animationDelay: `${index * 50}ms`,
          animationFillMode: 'forwards'
        }}
      >
        <div className="flex items-center gap-6 ">
          {/* 로고 */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300">
            <img src={club.image} alt={club.name} className="object-fill" />
          </div>

          {/* 클럽 정보 */}
          <div className="flex-1">
            <div className='flex items-center gap-3 mb-2'>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{club.name}</h3>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${status === 'ON' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {status === 'ON' ? '모집중' : '모집마감'}
              </span>
              <div className='flex items-center gap-1 ml-auto relative'>
                {club.positions.length < 4 ? (
                  // 4개 미만일 경우 모든 직군 표시
                  club.positions.map((position, index) => {
                    const colorConfig = tagColors[position as keyof typeof tagColors] || { bg: "bg-gray-100", text: "text-gray-600" };
                    return (
                      <span 
                        key={index}
                        className={`px-2 py-1 text-xs rounded-md ${colorConfig.bg} ${colorConfig.text}`}
                      >
                        {position}
                      </span>
                    );
                  })
                ) : (
                  // 4개 초과일 경우 처음 3개만 표시하고 나머지는 +로 표시
                  <>
                    {club.positions.slice(0, 3).map((position, index) => {
                      const colorConfig = tagColors[position as keyof typeof tagColors] || { bg: "bg-gray-100", text: "text-gray-600" };
                      return (
                        <span 
                          key={index}
                          className={`px-2 py-1 text-xs rounded-md ${colorConfig.bg} ${colorConfig.text}`}
                        >
                          {position}
                        </span>
                      );
                    })}
                    <span 
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md cursor-help relative"
                      onMouseEnter={() => setHoveredClub(club.id)}
                      onMouseLeave={() => setHoveredClub(null)}
                    >
                      +{club.positions.length - 3}
                      
                      {/* 툴팁 */}
                      {isHovered && hiddenPositions.length > 0 && (
                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-max">
                          <div className="text-xs text-gray-500 mb-2">추가 직군</div>
                          <div className="flex flex-wrap gap-1">
                            {hiddenPositions.map((position, index) => {
                              const colorConfig = tagColors[position as keyof typeof tagColors] || { bg: "bg-gray-100", text: "text-gray-600" };
                              return (
                                <span 
                                  key={index}
                                  className={`px-2 py-1 text-xs rounded-md ${colorConfig.bg} ${colorConfig.text}`}
                                >
                                  {position}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-2">{club.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{club.class}기</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Since {club.founded}</span>
                </div>
              </div>

              <a 
                href={club.target} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="동아리 페이지로 이동" 
                className="text-gray-400 hover:text-blue-500 transition-colors"
                onClick={(e) => e.stopPropagation()} // 카드 전체 클릭 방지
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ClubFilter 
        onFilterChange={setCurrentFilter}
        onSearchChange={setSearchTerm}
      />
      
      <div className="space-y-4">
        {filteredAndSortedClubs.length > 0 ? (
          filteredAndSortedClubs.map((club, index) => ListView(club, index))
        ) : (
          <div className="flex flex-col items-center justify-center py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-gray-400 mb-4 overflow-hidden">
              <video src={noResultVideo} autoPlay loop muted className="w-full h-full object-cover relative top-[40px]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? '검색 결과가 없어요.' : 
               currentFilter === 'recruiting' ? '모집중인 동아리가 없어요' :
               currentFilter === 'closed' ? '모집마감인 동아리가 없어요' :
               '동아리를 찾을 수 없어요.'}
            </h3>
            <p className="text-gray-500 text-center">
              {searchTerm ? 
                `"${searchTerm}"에 대한 검색 결과가 없습니다.` :
                currentFilter === 'recruiting' ? '현재 모집중인 동아리가 없습니다. 나중에 다시 확인해보세요.' :
                currentFilter === 'closed' ? '현재 모집마감인 동아리가 없습니다.' :
                '조건에 맞는 동아리를 찾을 수 없습니다.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubListView;