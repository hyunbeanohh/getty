import { ClubSlideProps } from '@/components/club/types';
import ClubStatusBadge from './ClubStatusBadge';

const ClubSlide = ({ club, loading, onClick }: ClubSlideProps) => {
  const handleClick = () => {
    onClick?.(club.target);
  };

  return (
    <li
      className="relative mx-20 cursor-pointer w-[200px] h-[200px] p-[1px] will-change-transform"
      onClick={handleClick}
    >
      {loading && <ClubStatusBadge status={club.status} />}
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg border-2 border-gray-300 transition-all duration-200 hover:border-blue-500">
          <img 
            src={club.image} 
            alt={club.id} 
            className="w-full h-full object-fill"
            loading="lazy"
          />
        </div>
      </div>
    </li>
  );
};

export default ClubSlide;