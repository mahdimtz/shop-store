import React from 'react'

const DashboardSkeleton = () => {
  return (
    <>
    <div className='flex gap-5 px-5 py-5 items-center'>
        <div className='w-20 h-20 rounded-full animate-pulse bg-gray-600'>
         
        </div>
        <div className='flex flex-col flex-1'>
          <div className=' w-24 h-2 rounded-lg mb-2 animate-pulse bg-gray-500'></div>
          <div className=' w-28 h-2 rounded-lg  animate-pulse bg-gray-400'></div>
        </div>
        <div>
          <button className='flex w-24 h-10 rounded-lg bg-gray-500 animate-pulse'></button>
        </div>
       </div>
       <div className='mt-1  rounded-lg h-3 bg-gray-500 animate-pulse'></div>
    </>
  )
}

export default DashboardSkeleton