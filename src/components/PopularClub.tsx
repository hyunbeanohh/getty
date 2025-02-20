import { useEffect, useState } from 'react';
import guideImage from '@/assets/images/guideImage.png';
import Depromeet from '@/assets/images/Deproment.png';
import DND from '@/assets/images/Dnd.png';
import YAPP from '@/assets/images/Yapp.png';
import DDD from '@/assets/images/Ddd.png';
import MashUP from '@/assets/images/Mashup.png';
import SOPT from '@/assets/images/Sopt.png';
import NEXTERS from '@/assets/images/Nexters.jpg';
import Prography from '@/assets/images/Prography.png';
import Programming from '@/assets/images/Programming.jpg';
import AUGS from '@/assets/images/Augs.png';
import eyeIcon from '@/assets/icon/eye-icon.png';
import shareIcon from '@/assets/icon/share.png';
import { kadvice } from 'kadvice';

interface Club {
  id: number;
  name: string;
  // rank: number;
  image: string;
  description: string;
  target: string;
}

const ClubRanking = () => {

  // kadvice 데이터 연동
  const kadviceData = kadvice.getAll();
  const randomIndex = Math.floor(Math.random() * kadviceData.length);
  const randomKadvice = kadviceData[randomIndex];
  
  // 임시 동아리 데이터
  const clubData = [
    { id: 1, name: '디프만', image: Depromeet, description: '디프만은 디자이너와 프로그래머가 만났을 때의 줄임말로, 서비스 기획부터 론칭과 개선까지 다양한 경험을 합니다.', target: 'https://www.depromeet.com' },
    { id: 2, name: 'DDD', image: DDD, description: 'DDD는 개발자와 디자이너가 함께 사이드 프로젝트를 진행하며 서로의 이해와 친목을 쌓는 기회를 제공합니다.', target: 'https://dddset.notion.site/DDD-7b73ca41b67c4658b292a4662581ee01' },
    { id: 3, name: 'DND', image: DND, description: 'DND는 사이드 프로젝트를 해보고 싶은 개발자와 디자이너가 팀을 이뤄 8주간 프로젝트를 경험하는 비영리단체입니다.', target: 'https://dnd.ac' },
    { id: 4, name: 'YAPP', image: YAPP, description: 'YAPP은 대학생들의 다양한 아이디어와 열정으로 새로운 가치를 만드는 기업형 IT 동아리입니다.', target: 'https://www.yapp.co.kr' },
    { id: 5, name: 'MashUP', image: MashUP, description: 'MashUp은 개발과 디자인에 관심 있는 사람들이 모여 팀별 스터디와 네트워킹을 통해 프로젝트를 진행하는 IT 연합 동아리입니다.', target: 'https://mash-up.kr' },
    { id: 6, name: 'SOPT', image: SOPT, description: 'SOPT는 IT와 벤처창업에 뜻이 있는 대학생들이 모인 연합 IT벤처창업 동아리입니다.', target: 'https://www.sopt.org' },
    { id: 7, name: 'NEXTERS', image: NEXTERS, description: 'NEXTERS는 자유롭게 협업하고 소통하며 IT 인재로 발전하는 것을 목표로 하는 동아리입니다.', target: 'https://www.nexters.co.kr' },
    { id: 8, name: 'Prography', image: Prography, description: 'Prography는 개발자와 디자이너가 함께 서비스를 기획하고 개발하는 프로젝트를 진행합니다.', target: 'https://prography.org/' },
    { id: 9, name: 'Programming', image: Programming, description: 'Programming은 비전공자들이 파이썬과 장고를 기반으로 웹 개발을 배우는 동아리입니다.', target: 'https://pirogramming.com/' },
    { id: 10, name: 'AUGS', image: AUGS, description: 'AUGS는 개발과 즐거운 네트워크 형성을 함께하는 대학생들의 모임입니다.', target: 'https://ausg.me/' },
  ];
  
  const Card = ({ club, img }: { club: Club, img: string }) => {

    const [clicks, setClicks] = useState(0);

    const handleClick = async () => {
      try {
        const response = await fetch('/api/incrementClick', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ club_name: club.name }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to increment click');
        }
      } catch (error) {
        console.error('Error incrementing click:', error);
      }
    }

    const fetchClickCount = async () => {
      const response = await fetch(`/api/getClickCount?club_name=${club.name}`);
      const data = await response.json();
      if (response.ok) {
        setClicks(data.clicks);
      }
    };
  
    useEffect(() => {
      fetchClickCount();
    }, [club.name]);
    
    return (
      <article className='w-[200px] h-[300px]' onClick={handleClick}>
        <div className='relative flex w-[200px] h-[300px] border-2 p-4 border-gray-300 rounded-lg'>
          <a className='w-full h-full' href={club.target} rel='noopener noreferrer' target='_blank' onClick={()=>{
            {/* 동아리 상세 페이지로 이동 */}
          }}>
            <span className='block w-full h-full'>
              <img src={img} alt={club.name} className='w-full h-[50%] object-fill'/>
              {/* 인기 동아리 */}
              
            </span>
          </a>
          <div className='absolute bottom-2 left-0 flex flex-col p-[10px_5px_5px_5px] w-full bg-white'>
            {/* 동아리 남은 모집 날짜 */}
            {/* <span>{club.date}</span> */}
            {/* 동아리 이름 */}
            <h3 className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>{club.name}</h3>
            {/* 동아리 요약 */}
            <span className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>{club.description}</span>
            <div className='flex items-center justify-end opacity-[0.5] rounded-lg'>
              <img src={eyeIcon} alt="eyeIcon" className='w-[25px] h-[25px] float-right' />
              <span className='text-xs font-semibold'>{clicks}</span>
              <img src={shareIcon} alt="shareIcon" className='w-[15px] h-[15px] float-right ml-2 mr-2' />
            </div>
          </div>
        </div>
        
      </article>
    );
  };

  return (
    <div>
      <div className='w-full h-full bg-white mx-auto mt-5 rounded-lg'>
        <div className='bg-[#25292E] w-full h-[200px] flex flex-col justify-center items-center mx-auto text-white text-center font-pretendard rounded-lg'>
          <span className='text-lg font-semibold text-gray-300 mb-5'>{randomKadvice.author}</span>
          <span className='text-2xl font-semibold'>{randomKadvice.message}</span>
        </div>

        <div>
          <span className='relative text-lg block left-10 mt-10 mb-5 font-semibold font-pretendard'>인기 동아리</span>
          <div className='grid grid-cols-5 justify-items-center gap-5 rounded-lg pb-5'>
            {/* 임시 동아리 데이터 연동 */}
            {clubData.map((club) => (
              <Card key={club.id}
                    club={club} 
                    img={club.image}
                    clicks={club.clicks}
              />
            ))}
          </div>
        </div>        
      </div>
    </div>
  )
}

export default ClubRanking