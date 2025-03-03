import image1 from '@/assets/images/image1.png';
import image2 from '@/assets/images/image2.png';
import image3 from '@/assets/images/image3.png';
import image4 from '@/assets/images/image4.png';
import image5 from '@/assets/images/image5.png';
import image6 from '@/assets/images/image6.png';
import image7 from '@/assets/images/image7.png';
import image8 from '@/assets/images/image8.png';

const AllClubCardSection = () => {

  const clubData = [
    { id: 1, name: '같이에듀', rank: 1 , image: image1, summary: '교육 봉사 동아리', date: '2024-04-10' },
    { id: 2, name: 'SF AWARD', rank: 2 , image: image2, summary: 'SF 소설 창작 동아리', date: '2024-04-15' },
    { id: 3, name: '삼성생명', rank: 3 , image: image3, summary: '금융 스터디 동아리', date: '2024-04-20' },
    { id: 4, name: '뷰티대기업', rank: 4 , image: image4, summary: '뷰티 마케팅 동아리', date: '2024-04-12' },
    { id: 5, name: '책 쓰기 프로젝트', rank: 5 , image: image5, summary: '작가 지망생 모임', date: '2024-04-25' },
    { id: 6, name: '컴투스 글로벌 게임개발', rank: 6 , image: image6, summary: '게임 개발 동아리', date: '2024-04-18' },
    { id: 7, name: '남원의 맛', rank: 7 , image: image7, summary: '전통 음식 연구 동아리', date: '2024-04-30' },
    { id: 8, name: 'LG전자 베스트 샵 콘테스트', rank: 8 , image: image8, summary: '마케팅 공모전 동아리', date: '2024-04-22' }
  ];

  const Card = ({ club, img }: { club: any, img: any }) => {
    // D-day 계산 함수
    const calculateDday = (endDate: string) => {
      const end = new Date(endDate);
      const today = new Date();
      const diff = end.getTime() - today.getTime();
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    return (
      <article>
        <div className='relative flex w-[300px] h-[500px] border-2 p-4 border-gray-300 rounded'>
          <a className='w-full h-full' onClick={()=>{
            {/* 동아리 상세 페이지로 이동 */}
          }}>
            <span className='block w-full h-full'>
              <img src={img} alt={club.name} className='w-full h-full object-fit'/>
              {/* 인기 동아리 */}
              
            </span>
          </a>
          <div className='absolute bottom-2 left-0 flex flex-col gap-1 p-2 w-full bg-white'>
            <div className='w-fit inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-default text-default-foreground hover:bg-default/80'>
              D{calculateDday(club.date)}
            </div>
            {/* 동아리 이름 */}
            <h3 className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>{club.name}</h3>
            {/* 동아리 요약 */}
            <span className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold'>{club.summary}</span>
          </div>
        </div>
        
      </article>
    );
  };

  return (
    <div>
        <div className='w-full h-full bg-white mt-10'>
            <div className='w-full h-full flex'>
                <span className='text-lg font-semibold font-pretendard p-10'>전체 동아리</span>
                <select className='w-fit h-fit p-2 border rounded-md ml-auto mt-10 mr-10'>
                  <option value="최신순">전체</option>
                  <option value="마감순">최신순</option>
                  <option value="여유있는순">여유있는순</option>
                </select>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center'>
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
  )
}

export default AllClubCardSection