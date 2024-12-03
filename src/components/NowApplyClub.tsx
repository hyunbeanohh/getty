import React, { useState } from 'react'

const NowApplyClub = () => {

  const slides = [ // 상태 관리 툴으로 변경 필요
    { color : "red", target: "#"},
    { color : "blue", target: "#"},
    { color : "green", target: "#"},
    { color : "yellow", target: "#"},
  ]
  
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);

  return (
    <div className="wrapper w-[1500px] mt-5 mx-auto">
            <div className="overflow-hidden bg-white">
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
                                className={`mx-20 cursor-pointer z-[2] transition-all duration-300 hover:scale-[0.98]
                                    hover:after:content-[''] hover:after:absolute hover:after:inset-0 
                                    hover:after:w-full hover:after:h-full hover:after:bg-black/20
                                    w-[200px] h-[200px]`}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{ background: s.color }}
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
                                className={`mx-20 cursor-pointer z-[2] transition-all duration-300 hover:scale-[0.98]
                                    hover:after:content-[''] hover:after:absolute hover:after:inset-0 
                                    hover:after:w-full hover:after:h-full hover:after:bg-black/20
                                    w-[200px] h-[200px]`}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{ background: s.color }}
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