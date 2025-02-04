import React from 'react'
import '../index.css'

const Header = () => {
  return (
    <div className='w-full h-16 bg-[#25292E] flex justify-center items-center'>
      <div className='flex justify-center items-center mt-1 h-500'>
        <div className='text-lg mr-5 text-white hover:text-yellow-400 cursor-pointer'>홈</div>
        <a 
          className='text-lg mr-5 text-white hover:text-yellow-400 cursor-pointer'
          href='https://news.hada.io/'
          rel='noopener noreferrer'
          target='_blank'
        >
            IT 뉴스
        </a>
        <div className='text-lg mr-5 text-white hover:text-yellow-400 cursor-pointer'>동아리</div>
        <div className='text-lg mr-5 text-white hover:text-yellow-400 cursor-pointer'>스터디</div>
        <div className='text-lg mr-5 text-white hover:text-yellow-400 cursor-pointer'>모집 요청</div>
      </div>
    </div>
  )
}

export default Header