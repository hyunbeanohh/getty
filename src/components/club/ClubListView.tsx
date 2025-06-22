import { useState, useMemo, useRef, useEffect } from 'react';
import { clubData, Club } from '@/data/clubData';
import ClubFilter from './ClubFilter';
import { Star, Users, Clock, ExternalLink } from 'lucide-react';
import { useClubStatus } from '@/hooks/useClubStatus';
import { useClubClicks } from '@/hooks/useClubClicks';

const ClubListView = () => {
  const { getClubStatus, loading: statusLoading, error: statusError } = useClubStatus();
  const { getClubClicks, loading: clicksLoading, error: clicksError } = useClubClicks();
  
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 스크롤 위치 저장을 위한 ref
  const scrollPositionRef = useRef<number>(0);

  // 필터링 및 정렬된 동아리 목록
  const filteredAndSortedClubs = useMemo(() => {
    // 현재 스크롤 위치 저장
    scrollPositionRef.current = window.scrollY;
    
    let filteredClubs = clubData;

    // 검색어 필터링
    if (searchTerm) {
      filteredClubs = filteredClubs.filter(club => 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.positions.some(position => position.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 모집 상태별 필터링 및 정렬
    if (currentFilter === 'recruiting') {
      // 모집중인 동아리들을 먼저 정렬
      filteredClubs = filteredClubs.sort((a, b) => {
        const statusA = getClubStatus(a.name);
        const statusB = getClubStatus(b.name);
        
        if (statusA === 'ON' && statusB === 'OFF') return -1;
        if (statusA === 'OFF' && statusB === 'ON') return 1;
        return 0;
      });
    } else if (currentFilter === 'closed') {
      // 모집마감인 동아리들을 먼저 정렬
      filteredClubs = filteredClubs.sort((a, b) => {
        const statusA = getClubStatus(a.name);
        const statusB = getClubStatus(b.name);
        
        if (statusA === 'OFF' && statusB === 'ON') return -1;
        if (statusA === 'ON' && statusB === 'OFF') return 1;
        return 0;
      });
    }

    return filteredClubs;
  }, [clubData, currentFilter, searchTerm, getClubStatus]);

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
              {/* <div className='flex items-center gap-1 text-yellow-500'>
                <Star className="w-4 h-4 fill-current" />
              </div> */}
            </div>
            <p className="text-gray-600 mt-2">{club.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{club.class}기</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{clicksLoading ? '로딩 중...' : clicks.toLocaleString()}</span>
                </div> */}
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
        {filteredAndSortedClubs.map((club, index) => ListView(club, index))}
      </div>
    </div>
  );
};

export default ClubListView;