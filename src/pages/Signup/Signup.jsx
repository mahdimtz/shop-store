import React from 'react'
import SignupForm from '../../components/forms/SignupForm'

const Signup = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-gray-200 flex flex-col items-center justify-center gap-4'>
      <h1 className='font-bold text-xl text-gray-600'>ثبت نام</h1>
      <SignupForm/>
    </div>
  )
}

export default Signup