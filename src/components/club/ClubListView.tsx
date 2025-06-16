import { clubData, Club } from '@/data/clubData';
import ClubFilter from './ClubFilter';

const ClubListView = () => {
  const ListView = (club: Club, index: number) => (
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
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{club.name}</h3>
          <p className="text-gray-600 mt-2">{club.description}</p>
        </div>
      </div>

      
    </div>
  );

  return (
    <div>
      <ClubFilter />
      <div className="space-y-4">
        {clubData.map((club, index) => ListView(club, index))}
      </div>
    </div>
  );
};

export default ClubListView;