import React from 'react'
import guideImage from '@/assets/images/guideImage.png';
import Depromeet from '@/assets/images/Deproment.png';
import DND from '@/assets/images/DND.png';
import YAPP from '@/assets/images/YAPP.png';
import DDD from '@/assets/images/DDD.png';
import MashUP from '@/assets/images/mashup.png';

interface Club {
  id: number;
  name: string;
  rank: number;
  image: string;
  description: string;
}

const ClubRanking = () => {
  // 임시 동아리 데이터
  const clubData = [
    { id: 1, name: '디프만', rank: 1 , image: Depromeet, description: '디프만은 디자이너와 프로그래머가 만났을 때를 의미합니다.' },
    { id: 2, name: 'DDD', rank: 2 , image: DDD, description: 'DDD는 Developer Developer Developer의 약자입니다.' },
    { id: 3, name: 'DND', rank: 3 , image: DND, description: 'DND는 개발자들의 네트워킹 동아리입니다.' },
    { id: 4, name: 'YAPP', rank: 4 , image: YAPP, description: 'YAPP은 IT 연합 동아리입니다.' },
    { id: 5, name: 'MashUP', rank: 5 , image: MashUP, description: 'MashUp은 IT 창업 연합 동아리입니다.' }
      
  ];
  
  const Card = ({ club, img }: { club: Club, img: string }) => {
    return (
      <article>
        <div className='relative flex w-[250px] h-[300px] border-2 p-4 border-gray-300 rounded'>
          <a className='w-full h-full' href='javascript:;' onClick={()=>{
            {/* 동아리 상세 페이지로 이동 */}
          }}>
            <span className='block w-full h-full'>
              <img src={img} alt={club.name} className='w-full h-full object-fit'/>
              {/* 인기 동아리 */}
              
            </span>
          </a>
          <div className='absolute bottom-2 left-0 flex flex-col gap-1 p-2 w-full bg-white'>
            {/* 동아리 남은 모집 날짜 */}
            {/* <span>{club.date}</span> */}
            <div className='w-fit inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-default text-default-foreground hover:bg-default/80'>D-10</div>
            {/* 동아리 이름 */}
            <h3 className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>{club.name}</h3>
            {/* 동아리 요약 */}
            <span className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>{club.description}</span>
          </div>
        </div>
        
      </article>
    );
  };

  return (
    <div>
      <div className='w-[1500px] h-full bg-white mx-auto mt-5 rounded-lg'>
        
        <div className='w-full h-[200px] flex justify-center items-center mx-auto'>
          <img src={guideImage} 
              alt="안내이미지" 
            className='w-full h-full object-cover rounded-t-lg'
          />
        </div>

        <div>
          <span className='relative text-lg block left-10 mt-10 mb-5 font-semibold font-pretendard'>인기 동아리</span>
          <div className='flex flex-wrap justify-center gap-10 pb-10'>
            {/* 임시 동아리 데이터 연동 */}
            {clubData.map((club) => (
              <Card key={club.id}
                    club={club} 
                    img={club.image}
              />
            ))}
          </div>
        </div>        
      </div>
    </div>
  )
}

export default ClubRanking