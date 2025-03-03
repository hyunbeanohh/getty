import React, { useState , useEffect} from 'react'
import guideImage from '@/assets/images/guideImage.png';
import Depromeet from '@/assets/images/Deproment.png';
import DND from '@/assets/images/DND.png';
import YAPP from '@/assets/images/YAPP.png';
import DDD from '@/assets/images/DDD.png';
import MashUP from '@/assets/images/mashup.png';
// import SOPT from '@/assets/images/SOPT.png';
// import NEXTERS from '@/assets/images/NEXTERS.png';
// import Prography from '@/assets/images/Prography.png';

const NowApplyClub = () => {

  const slides = [
      { id: 'depromeet', image: Depromeet, target: "https://www.depromeet.com", status: "마감" },
      { id: 'dnd', image: DND, target: "https://dnd.ac", status: "마감" },
      { id: 'yapp', image: YAPP, target: "https://www.yapp.co.kr", status: "마감" },
      { id: 'ddd', image: DDD, target: "https://www.dddcommunity.org", status: "마감" },
      { id: 'mashup', image: MashUP, target: "https://recruit.mash-up.kr/recruit/web", status: "마감" },
  ]
  const [loading, setLoading] = useState(false);
  const [clubStatus, setClubStatus] = useState<{[key: string]: any}>({});
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);

  // 메모이제이션된 슬라이드 아이템 렌더링 함수
  const renderSlideItems = React.useCallback((slideItems: typeof slides) => {
    return slideItems.map((s, i) => (
      <li
        key={i}
        className="relative mx-20 cursor-pointer w-[200px] h-[200px] p-[1px] will-change-transform"
        onClick={() => window.open(s.target, '_blank')}
      >
        {loading && (
          <div className="absolute top-2 right-2 z-20">
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${clubStatus[s.id]?.status === "ON" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}>
              {clubStatus[s.id]?.status === "ON" ? "모집중" : "마감"}
            </span>
          </div>
        )}
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg border-2 border-gray-300 transition-all duration-200 hover:border-blue-500"
          >
            <img src={s.image} alt={s.id} className='w-full h-full object-fill'/>
          </div>
        </div>
      </li>
    ));
  }, [loading, clubStatus]);

  useEffect(() => {
    const fetchClubStatus = async () => {
      try {
        const response = await fetch('/api/scrapeClubs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(slides.map(slide => ({
            name: slide.id,
            url: slide.target,
            button_text: '지원' // 각 클럽의 버튼 텍스트에 맞게 수정
          }))),
        });
        const data = await response.json();
        setClubStatus(data);
      } catch (error) {
        console.error('Error fetching club status:', error);
      } finally {
        setLoading(true);
      }
    };

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
    fetchClubStatus();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [animate]); // animate 의존성 추가

  // CSS 변수를 사용하여 애니메이션 상태 제어
  const animationStyle = {
    '--animation-play-state': animate ? 'running' : 'paused'
  } as React.CSSProperties;

  return (
    <div className="wrapper w-[1500px] mt-5 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg">
        <div className='flex justify-between items-center px-5 mb-5'>
          <span className='relative text-lg block left-5 mt-3 mb-5 font-semibold font-pretendard'>모집 동아리</span>
          
          {/* <select className='p-2 border rounded-md'>
            <option value="최신순">전체</option>
            <option value="마감순">최신순</option>
            <option value="">여유있는순</option>
          </select> */}
        </div>
        <ul
          className="flex flex-nowrap w-[1200px] h-[220px] overflow-hidden mx-auto mb-10"
          onMouseEnter={onStop}
          onMouseLeave={onStart}
          style={animationStyle}
        >
          <div
            className="flex items-center flex-nowrap relative mb-5 animate-infinite1-reverse will-change-transform"
            style={{ animationPlayState: 'var(--animation-play-state)' }}
          >
            {renderSlideItems(slides)}
          </div>
          <div
            className="flex items-center flex-nowrap relative mb-5 animate-infinite2-reverse will-change-transform"
            style={{ animationPlayState: 'var(--animation-play-state)' }}
          >
            {renderSlideItems(slides)}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default NowApplyClub