import React from 'react'

const AllClubCardSection = () => {
  return (
    <div>
        <div className='w-full h-full bg-white'>
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