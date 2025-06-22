import Kadvice from '../Kadvice';
import ClubListView from './ClubListView';

const AllClub = () => {

  return (
    <div>
      <div className='w-full h-full bg-white mx-auto mt-5 rounded-lg'>
        <Kadvice />
      </div>
      <div className='w-[1000px] mx-auto'>
        <ClubListView/>
      </div>
    </div>
  )
}

export default AllClub;