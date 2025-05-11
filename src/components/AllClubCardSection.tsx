const AllClubCardSection = () => {

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
        </div>
    </div>
  )
}

export default AllClubCardSection