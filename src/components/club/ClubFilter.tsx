import { useState } from 'react';
import { clubData } from '@/data/clubData';
import { Filter, Search } from 'lucide-react';

const ClubFilter = () => {

  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');

  return (
    <div className="mt-10 mb-10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">전체 동아리</h2>
                <span className="text-gray-500 text-lg">({clubData.length}개)</span>
            </div>

        {/* 검색 */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="동아리, 기술스택, 포지션 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-6 py-3 w-80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                />
        </div>

            {/* 고급 필터 토글 */}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${showFilters ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Filter className="w-5 h-5" />
                필터
            </button>

            {/* 기본 필터 */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent border-none px-4 py-2 focus:ring-0 focus:outline-none text-gray-700 font-medium"
                >
                  <option value="all">전체</option>
                  <option value="recruiting">모집중</option>
                  <option value="closed">모집마감</option>
                </select>
              </div>
        </div>
    </div>
  )
}

export default ClubFilter