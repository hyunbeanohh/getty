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
        { id: 'mashup', image: MashUP, target: "https://mash-up.kr", status: "마감" },
    ]
  const [loading, setLoading] = useState(false);
  const [clubStatus, setClubStatus] = useState<{[key: string]: any}>({});
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);

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

    const handleScroll = () => {
      onStop(); // 스크롤 시 애니메이션 멈춤
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // 이전 타이머 클리어
      }
      scrollTimeout = setTimeout(onStart, 200); // 200ms 후 애니메이션 재개
    };

    window.addEventListener('scroll', handleScroll);
    fetchClubStatus();

    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // 타이머 클리어
      }
    };
  }, []);

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
                >
                    <div
                        className={`flex items-center flex-nowrap relative mb-5
                            animate-infinite1
                            ${!animate ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`}
                    >
                        {slides.map((s, i) => (
                            <li
                                key={i}
                                className="relative mx-20 cursor-pointer w-[200px] h-[200px] p-[1px]"
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
                                <div className="relative w-full h-[200px] rounded-lg overflow-hidden hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:w-full hover:after:h-full hover:after:bg-black/10 hover:after:rounded-lg">
                                    <div
                                        className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg border-2 border-gray-300"
                                    >
                                      <img src={s.image} alt={s.id} className='w-full h-full object-fill'/>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                    <div
                        className={`flex items-center flex-nowrap relative mb-5
                            animate-infinite2
                            ${!animate ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`}
                    >
                        {slides.map((s, i) => (
                            <li
                                key={i}
                                className={`relative mx-20 cursor-pointer w-[200px] h-[200px] p-[1px]`}
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
                                <div className="relative w-full h-[200px] rounded-lg overflow-hidden hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:w-full hover:after:h-full hover:after:bg-black/10 hover:after:rounded-lg">
                                    <div
                                        className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg border-2 border-gray-300"
                                    >
                                      <img src={s.image} alt={s.id} className='w-full h-full object-fill'/>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
  )
}

export default NowApplyClub