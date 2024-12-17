import React, { useState } from 'react'
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
    { image: Depromeet, target: "#", status: "모집중" },
    { image: DND, target: "#", status: "모집중" },
    { image: YAPP, target: "#", status: "마감" },
    { image: DDD, target: "#", status: "모집중" },
    { image: MashUP, target: "#", status: "마감" },
  ]
  
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);

  return (
    <div className="wrapper w-[1500px] mt-5 mx-auto">
            <div className="overflow-hidden bg-white rounded-lg">
              <div className='flex justify-between items-center px-5 mb-5'>
                <span className='relative text-lg block left-5 mt-3 mb-5 font-semibold font-pretendard'>전체 동아리</span>
                
                <select className='p-2 border rounded-md'>
                  <option value="최신순">전체</option>
                  <option value="마감순">최신순</option>
                  <option value="">여유있는순</option>
                </select>
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
                            >
                                <div className="absolute top-2 left-2 z-20">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${s.status === "모집중" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}>
                                        {s.status}
                                    </span>
                                </div>
                                <div className="relative w-full h-full rounded-lg overflow-hidden hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:w-full hover:after:h-full hover:after:bg-black/10 hover:after:rounded-lg">
                                    <div
                                        className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg border-2 border-gray-300"
                                        style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'contain' }}
                                    ></div>
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
                            >
                                <div className="absolute top-2 left-2 z-20">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${s.status === "모집중" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}>
                                        {s.status}
                                    </span>
                                </div>
                                <div
                                    className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg border-2 border-gray-300"
                                    style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'contain' }}
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