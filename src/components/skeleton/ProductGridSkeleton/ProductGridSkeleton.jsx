import React from 'react'

const ProductGridSkeleton = () => {
  return (
    <div className='rounded-xl flex flex-col gap-5 w-[20rem] overflow-hidden shadow-lg"'>
        <div className='bg-slate-400 animate-pulse rounded-t-xl h-[300px] w-[550px]'></div>
        <div className='bg-slate-400 animate-pulse rounded-xl w-[7rem] h-[1rem] '></div>
        <div className='bg-slate-400 animate-pulse rounded-xl w-[7rem] h-[1rem] '></div>

    </div>
  )
}

export default ProductGridSkeleton