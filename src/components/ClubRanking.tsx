import React from 'react'
import guideImage from '@/assets/images/guideImage.png';

const ClubRanking = () => {
  // 임시 동아리 데이터
  const clubData = [
    { id: 1, name: '동아리1', rank: 1 , image: guideImage},
    { id: 2, name: '동아리2', rank: 2 , image: guideImage},
    { id: 3, name: '동아리3', rank: 3 , image: guideImage},
    { id: 4, name: '동아리4', rank: 4 , image: guideImage},
    { id: 5, name: '동아리5', rank: 5 , image: guideImage}
      
  ];
  
  const Card = ({ club, img }: { club: any, img: any }) => {
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
            {/* <h4 className='text-xs'>{club.summary}</h4> */}
            <span className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>동아리 요약</span>
          </div>
        </div>
        
      </article>
    );
  };

  return (
    <div>
      <div className='w-[1500px] h-full bg-white mx-auto mt-5'>
        
        <div className='w-full h-[200px] flex justify-center items-center mx-auto'>
          <img src={guideImage} 
              alt="안내이미지" 
            className='w-full h-full object-cover'
          />
        </div>

        <div>
          <span className='relative text-lg block left-10 mt-10 mb-5 font-semibold font-pretendard'>인기 동아리</span>
          <div className='flex flex-wrap justify-center gap-10'>
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