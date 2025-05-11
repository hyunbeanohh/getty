import { ClubSlideListProps } from '@/components/club/types';
import ClubSlide from './ClubSlide';
import { motion } from 'framer-motion';

const ClubSlideList = ({ clubs, loading, onStop, onStart }: ClubSlideListProps) => {
  
  const handleSlideClick = (target: string) => {
    window.open(target, '_blank');
  };

  const duplicateClubs = [...clubs, ...clubs];

  return (
    <ul
      className="flex flex-nowrap w-[1200px] h-[220px] overflow-hidden mx-auto mb-10"
      onMouseEnter={onStop}
      onMouseLeave={onStart}
    >
      <motion.div
        className="flex items-center flex-nowrap relative mb-5"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicateClubs.map((club, index) => (
          <ClubSlide
            key={`${club.id}-${index}`}
            club={club}
            loading={loading}
            onClick={handleSlideClick}
          />
        ))}
      </motion.div>
      <motion.div
        className="flex items-center flex-nowrap relative mb-5"
        animate={{
          x: ["0%",  "-100%"]
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicateClubs.map((club, index) => (
          <ClubSlide
            key={`${club.id}-${index}-clone`}
            club={club}
            loading={loading}
            onClick={handleSlideClick}
          />
        ))}
      </motion.div>
    </ul>
  );
};

export default ClubSlideList;