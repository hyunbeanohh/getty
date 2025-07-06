import { kadvice } from 'kadvice';

const Kadvice = () => {
  //advice 데이터 연동
  const kadviceData = kadvice.getAll();
  const randomIndex = Math.floor(Math.random() * kadviceData.length);
  const randomKadvice = kadviceData[randomIndex];

  return (
    <div className='bg-[#25292E] w-full h-[200px] flex flex-col justify-center items-center mx-auto text-white text-center font-pretendard rounded-lg'>
          <span className='text-lg font-semibold text-gray-300 mb-5'>{randomKadvice.author}</span>
          <span className='text-2xl font-semibold'>{randomKadvice.message}</span>
    </div>
  )
}

export default Kadvice