import React, { useState } from 'react'
import guideImage from '@/assets/images/guideImage.png';
import Depromeet from '@/assets/images/Deproment.png';
import DND from '@/assets/images/DND.png';
import YAPP from '@/assets/images/YAPP.png';
import DDD from '@/assets/images/DDD.png';
// import mashup from '@/assets/images/mashup.png';
// import SOPT from '@/assets/images/SOPT.png';
// import NEXTERS from '@/assets/images/NEXTERS.png';
// import Prography from '@/assets/images/Prography.png';

const NowApplyClub = () => {

  const slides = [
    { image: Depromeet, target: "#" },
    { image: DND, target: "#" },
    { image: YAPP, target: "#" },
    { image: DDD, target: "#" },
  ]
  
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);

  return (
    <div className="wrapper w-[1500px] mt-5 mx-auto">
            <div className="overflow-hidden bg-white rounded-lg">
              <div className='flex justify-between items-center px-5 mb-5'>
                <span className='relative text-lg block left-5 mt-3 mb-5 font-semibold font-pretendard'>현재 모집 중인 동아리</span>
                
                <select className='p-2 border rounded-md'>
                  <option value="최신순">전체</option>
                  <option value="마감순">최신순</option>
                  <option value="">여유있는순</option>
                </select>
              </div>
                <ul
                    className="flex flex-nowrap w-[1200px] h-[200px] overflow-hidden mx-auto mb-10"
                    onMouseEnter={onStop}
                    onMouseLeave={onStart}
                >
                    <div
                        className={`flex items-center flex-nowrap relative mb-10
                            animate-infinite1
                            ${!animate ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`}
                    >
                        {slides.map((s, i) => (
                            <li
                                key={i}
                                className={`mx-20 cursor-pointer z-[2] hover:scale-[1] rounded-lg
                                    hover:after:content-[''] hover:after:absolute hover:after:inset-0 
                                    hover:after:w-full hover:after:h-full hover:after:bg-black/10 hover:after:rounded-lg
                                    w-[200px] h-[200px]`}
                            >
                                <div
                                    className="w-full h-full bg-cover bg-center bg-no-repeat bg-contain rounded-lg"
                                    style={{ backgroundImage: `url(${s.image})` }}
                                ></div>
                            </li>
                        ))}
                    </div>
                    <div
                        className={`flex items-center flex-nowrap relative mb-10
                            animate-infinite2
                            ${!animate ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`}
                    >
                        {slides.map((s, i) => (
                            <li
                                key={i}
                                className={`mx-20 cursor-pointer z-[2] hover:scale-[1] rounded-lg
                                    hover:after:content-[''] hover:after:absolute hover:after:inset-0 
                                    hover:after:w-full hover:after:h-full hover:after:bg-black/10 hover:after:rounded-lg
                                    w-[200px] h-[200px]`}
                            >
                                <div
                                    className="w-full h-full bg-cover bg-center bg-no-repeat bg-contain rounded-lg"
                                    style={{ backgroundImage: `url(${s.image})` }}
                                ></div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
  )
}

export default NowApplyClub