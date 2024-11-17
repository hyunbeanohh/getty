import React from 'react'
import guideImage from '@/assets/images/guideImage.png';

const ClubRanking = () => {
  // 임시 동아리 데이터
  const clubData = [
    { id: 1, name: '동아리1', rank: 1 , image: guideImage},
    { id: 2, name: '동아리2', rank: 2 , image: guideImage},
    { id: 3, name: '동아리3', rank: 3 , image: guideImage},
  ];
  
  const Card = ({ club, img }: { club: any, img: any }) => {
    return (
      <div>
        <img src={img} alt={club.name} />
        <span>{club.name} - {club.rank}</span>
      </div>
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

        <div className='flex items-center'>
          <span className='relative text-lg block left-10 mt-10 mb-5 font-semibold font-pretendard'>인기 동아리 순위</span>
          <div className='flex flex-col items-center col-12 col-sm-4'>
            {/* 임시 동아리 데이터 연동 */}
            {clubData.map((club) => (
              <Card key={club.id} club={club} img={club.image}/>
            ))}
          </div>
        </div>        
      </div>
    </div>
  )
}

export default ClubRanking