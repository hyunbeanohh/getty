import Kadvice from '../Kadvice';
import ClubListView from './ClubListView';

const AllClub = () => {

  return (
    <div>
      <div className='w-full h-full bg-white mx-auto rounded-lg mt-10'>
        <Kadvice />
      </div>
      <div className='w-[1000px] mx-auto'>
        <ClubListView/>
      </div>
    </div>
  )
}

export default AllClub;