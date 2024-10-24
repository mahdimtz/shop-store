import React from 'react'

const ProductGridSkeleton = () => {
  return (
    <div className='rounded-xl flex flex-col gap-5 overflow-hidden shadow-lg mx-auto'>
        <div className='bg-slate-400 animate-pulse rounded-t-xl h-[300px] w-[300px]'></div>
        <div className='bg-slate-400 animate-pulse rounded-xl w-[7rem] h-[1rem] flex justify-center  '></div>
        <div className='bg-slate-400 animate-pulse rounded-xl w-[7rem] h-[1rem] flex justify-center'></div>

    </div>
  )
}

export default ProductGridSkeleton