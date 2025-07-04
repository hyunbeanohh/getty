import '../index.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-16 bg-[#F1F7FF] flex justify-center items-center border-b border-gray-200 font-pretendard'>
      <div className='flex justify-center items-center mt-1 h-500'>
        <div className='text-lg mr-5 text-black hover:text-yellow-400 cursor-pointer'
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </div>
        <a 
          className='text-lg mr-5 text-black hover:text-yellow-400 cursor-pointer'
          href='https://news.hada.io/'
          rel='noopener noreferrer'
          target='_blank'
        >
            IT 뉴스
        </a>
        <div 
          className='text-lg mr-5 text-black hover:text-yellow-400 cursor-pointer'
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