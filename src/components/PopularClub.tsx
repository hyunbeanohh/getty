import { useState, useEffect } from 'react'
import { CLUBS } from '@/components/club/constant';
import { useClubStatus } from '@/components/club/hook/useClubStatus';
import ClubSlideList from './club/ClubSlideList';

const PopularClub = () => {

  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);
  const { loading, clubStatus } = useClubStatus(CLUBS);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    // 스크롤 이벤트 최적화 (디바운싱)
    const handleScroll = () => {
      if (!animate) return; // 이미 멈춰있으면 처리 안함
      
      onStop(); // 스크롤 시 애니메이션 멈춤
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // 이전 타이머 클리어
      }
      
      scrollTimeout = setTimeout(onStart, 200); // 200ms 후 애니메이션 재개
    };

    // passive: true로 스크롤 이벤트 최적화
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [animate, onStop, onStart]);

  return (
    <div className="wrapper w-[1500px] mt-5 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg">
        <div className='flex justify-between items-center px-5 mb-5'>
          <span className='relative text-lg block left-5 mt-3 mb-5 font-semibold font-pretendard'>
            인기 동아리
          </span>
        </div>
        <ClubSlideList
          clubs={CLUBS}
          loading={loading}
          animate={animate}
          onStop={onStop}
          onStart={onStart}
        />
      </div>
    </div>
  );
};

export default PopularClub;