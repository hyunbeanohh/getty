import '../../index.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-16 bg-white flex justify-between items-center border-b border-gray-200 font-pretendard px-8'>
      <div className='flex-1'></div>
      <div className='flex justify-center items-center mt-1 h-500'>
        <div className='text-lg mr-5 text-black cursor-pointer rounded-lg p-[10px] hover:bg-gray-100 transition-colors'
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </div>
        <a 
          className='text-lg mr-5 text-black cursor-pointer rounded-lg p-[10px] hover:bg-gray-100 transition-colors'
          href='https://news.hada.io/'
          rel='noopener noreferrer'
          target='_blank'
        >
            IT 뉴스
        </a>
        <a 
          className='text-lg mr-5 text-black cursor-pointer rounded-lg p-[10px] hover:bg-gray-100 transition-colors'
          onClick={() => {
            navigate('/techBlog');
          }}
        >
            기술 블로그
        </a>
      </div>
      <div className='flex-1 flex justify-end'>
        <div 
          className='text-lg text-white cursor-pointer rounded-lg bg-[#3182f6] p-[10px] hover:bg-[#1b64da] transition-colors'
          onClick={() => {
            navigate('/request');
          }}
        >
          모집 요청
        </div>
      </div>
    </div>
  )
}

export default Header