import React from 'react'

const ErrorOnFetchApi = ({message = null}) => {
  return (
    <p className='font-vazir bg-red600 text-slate-50 text-center p-4  rounded-lg shadow-sm'>
        {message ? message :
        "مشکلی در دریافت اطلاعات پیش آمد دوباره امتحان کنید"
        }
    </p>
  )
}

export default ErrorOnFetchApi