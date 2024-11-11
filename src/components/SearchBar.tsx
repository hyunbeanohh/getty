import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-full h-[75px] bg-white'>
      <div className='w-full h-10 flex justify-center items-center'>
        <input className='w-[500px] h-10 rounded-md mt-10 outline-none bg-gray-100 rounded-2xl pl-4' type="text" placeholder='관심있는 동아리를 입력해주세요 :)' />
      </div>
    </div>
  )
}

export default SearchBar