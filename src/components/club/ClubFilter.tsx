import { useState } from 'react';
import { clubData } from '@/data/clubData';
import { Filter, Search } from 'lucide-react';

const ClubFilter = () => {

  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');

  return (
    <div className="mb-10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">전체 동아리</h2>
                <span className="text-gray-500 text-lg">({clubData.length}개)</span>
            </div>
        {/* 정렬 */}
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
            <option value="popularity">인기순</option>
            <option value="rating">평점순</option>
            <option value="members">멤버 수</option>
            <option value="newest">최신순</option>
            <option value="name">이름순</option>
        </select>


        {/* 검색 */}
        <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder="동아리, 기술스택, 포지션 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 w-80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
        </div>

        {/* 고급 필터 */}
        </div>

    </div>
  )
}

export default ClubFilter