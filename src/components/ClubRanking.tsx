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
        <div className='flex w-[250px] h-[350px] mb-10'>
          <a className='w-full h-full' href='javascript:;' onClick={()=>{
            {/* 동아리 상세 페이지로 이동 */}
          }}>
            <span className='block w-full h-full'>
              <img src={img} alt={club.name} className='w-full h-full object-fit'/>
            </span>
          </a>
          <div>
            {/* 동아리 이름 */}
            {/* 동아리 순위 */}
            {/* 동아리 남은 모집 날짜 */}
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
          <span className='relative text-lg block left-10 mt-10 mb-5 font-semibold font-pretendard'>인기 동아리 순위</span>
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