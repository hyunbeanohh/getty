import { ClubSlideListProps } from '@/components/club/types';
import ClubSlide from './ClubSlide';

const ClubSlideList = ({ clubs, loading, animate, onStop, onStart }: ClubSlideListProps) => {
  const handleSlideClick = (target: string) => {
    window.open(target, '_blank');
  };

  const animationStyle = {
    '--animation-play-state': animate ? 'running' : 'paused'
  } as React.CSSProperties;

  return (
    <ul
      className="flex flex-nowrap w-[1200px] h-[220px] overflow-hidden mx-auto mb-10"
      onMouseEnter={onStop}
      onMouseLeave={onStart}
      style={animationStyle}
    >
      <div
        className="flex items-center flex-nowrap relative mb-5 animate-infinite1 will-change-transform"
        style={{ animationPlayState: 'var(--animation-play-state)' }}
      >
        {clubs.map((club, index) => (
          <ClubSlide
            key={`${club.id}-${index}`}
            club={club}
            loading={loading}
            onClick={handleSlideClick}
          />
        ))}
      </div>
      <div
        className="flex items-center flex-nowrap relative mb-5 animate-infinite2 will-change-transform"
        style={{ animationPlayState: 'var(--animation-play-state)' }}
      >
        {clubs.map((club, index) => (
          <ClubSlide
            key={`${club.id}-${index}-clone`}
            club={club}
            loading={loading}
            onClick={handleSlideClick}
          />
        ))}
      </div>
    </ul>
  );
};

export default ClubSlideList;