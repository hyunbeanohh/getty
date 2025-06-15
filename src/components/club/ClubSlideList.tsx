import { ClubSlideListProps } from '@/components/club/types';
import ClubSlide from './ClubSlide';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ClubSlideList = ({ clubs, loading }: ClubSlideListProps) => {
  
  const handleSlideClick = (target: string) => {
    window.open(target, '_blank');
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // 네비게이션,페이지네이션,자동재생 모듈 추가
      slidesPerView={1} // 한 번에 보여지는 슬라이드 개수
      loop={true} // 무한 반복
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동재생 지연시간, 상호작용 시 자동재생 멈춤 여부
    >
      {clubs.map((club,index) => {
        return(
          <SwiperSlide key={index}>
            <div className='w-full h-full'>
              <ClubSlide club={club} loading={loading} onClick={handleSlideClick} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ClubSlideList;