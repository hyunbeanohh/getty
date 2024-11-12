import React, { useState } from 'react'

const NowApplyClub = () => {

  const ItSlide = [ // 상태 관리 툴으로 변경 필요
    { color : "red", target: "#"},
    { color : "blue", target: "#"},
    { color : "green", target: "#"},
    { color : "yellow", target: "#"},
  ]
  
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onStart = () => setAnimate(true);

  return (
    <div className='w-full h-[100px] mt-7 bg-white'>
      <div className='w-full h-10 float-left'>
        <span className='text-lg font-bold block relative left-[100px]'>현재 모집 중인 동아리</span>
        <div className='relative left-[50px] overflow-hidden'>
          <ul className='flex flex-newrap' onMouseEnter={onStop} onMouseLeave={onStart}>
            <div className={`slide original ${animate ? "" : "stop"}`}>
              {ItSlide.map((item, index) => (
                <li key={index} className={index%2 === 0 ? 'w-[280px] h-[280px]' : 'w-[200px] h-[200px]'}>
                  <div className={`w-full h-full bg-${item.color}`}></div>
                </li>
              ))}
            </div>
            <div className={`slide clone ${!animate ? "" : "stop"}`}>
              {ItSlide.map((item, index) => (
                <li key={index} className={index%2 === 0 ? 'w-[280px] h-[280px]' : 'w-[200px] h-[200px]'}>
                  <div className={`w-full h-full bg-${item.color}`}></div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NowApplyClub