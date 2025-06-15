import { useState, useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { CiShare2 } from 'react-icons/ci';
import { kadvice } from 'kadvice';
import { clubData, Club, tagColors } from '@/data/clubData';


const AllClub = () => {

  // kadvice 데이터 연동
  const kadviceData = kadvice.getAll();
  const randomIndex = Math.floor(Math.random() * kadviceData.length);
  const randomKadvice = kadviceData[randomIndex];

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

    const displayPositionBadge = (positions: string[]) => {
        if (!positions || positions.length === 0) return null;
        
        return (
            <div className="flex flex-wrap gap-1">
                {positions.map((position, index) => {
                    const colorStyle = tagColors[position as keyof typeof tagColors] || { bg: "bg-gray-100", text: "text-gray-600" };
                    return (
                        <div 
                            key={index}
                            className={`inline-block px-2 py-1 text-xs rounded-full ${colorStyle.bg} ${colorStyle.text}`}
                        >
                            {position}
                        </div>
                    );
                })}
            </div>
        );
    };
    
    return (
      <article className='w-[250px] h-[380px] transition-all duration-300 hover:scale-105 hover:shadow-lg' onClick={handleClick}>
        <div className='relative flex flex-col w-full h-full border-2 p-4 border-gray-300 rounded-lg bg-white'>
          <a className='w-full h-full' href={club.target} rel='noopener noreferrer' target='_blank'>
            <div className='block w-full h-full'>
              <img src={img} alt={club.name} className='w-full h-[50%] object-fill rounded-lg relative bottom-[10px]'/>
              <div className='min-h-[20px] flex flex-wrap gap-1 mb-2'>
                {displayPositionBadge(club.positions)}
              </div>
            </div>
          </a>
          <div className='absolute bottom-2 left-0 flex flex-col p-[10px_5px_5px_5px] w-full bg-white'>
            <h3 className='inline-flex items-center px-2.5 py-0.5 text-sm font-black min-h-[24px]'>{club.name}</h3>
            <span className='inline-flex items-center px-2.5 py-0.5 text-xs font-semibold min-h-[52px] line-clamp-3'>{club.description}</span>
            <div className='flex items-center justify-between opacity-[0.5] px-2 py-2 border-t border-gray-200 relative top-[10px] mt-auto'>
              <div className='flex items-center'>
                <FiEye className='w-[15px] h-[15px]'/>
                <span className='text-xs font-semibold ml-1'>{clicks}</span>
              </div>
              <CiShare2 className='w-[15px] h-[15px]' />
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
          <span className='relative text-lg block left-10 mt-10 mb-5 font-semibold font-pretendard'>전체 동아리</span>
          <div className='grid grid-cols-5 justify-items-center gap-5 rounded-lg pb-5'>
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

export default AllClub;