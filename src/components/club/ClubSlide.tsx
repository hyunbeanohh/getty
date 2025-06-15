import { ClubSlideProps } from '@/types/types';
import ClubStatusBadge from './ClubStatusBadge';

const ClubSlide = ({ club, loading, onClick }: ClubSlideProps) => {
  const handleClick = () => {
    onClick?.(club.target);
  };

  return (
    <li
      className="relative mx-20 cursor-pointer h-[200px] p-[1px] will-change-transform"
      onClick={handleClick}
    >
      {loading && <ClubStatusBadge status={club.status} />}
      <div className="relative rounded-lg overflow-hidden flex-shrink-0">
        <div className="bg-cover bg-center bg-no-repeat rounded-lg">
          <img 
            src={club.image} 
            alt={club.id} 
            className="w-full h-[200px] object-fill"
            loading="lazy"
          />
        </div>
      </div>
    </li>
  );
};

export default ClubSlide;