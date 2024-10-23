import React,{useEffect} from 'react'
import useStore from '../../store'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {getUserInfoWithTokenApi} from "../../utils/apis/users/getUserInfoWithTokenApi"
import { removeCookie } from '../../utils/helpers/cookie';
import DashboardSkeleton from '../../components/skeleton/DashboardSkeleton';
import ErrorOnFetchApi from '../../components/common/ErrorOnFetchApi';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from '../../components/common/Header';
const Dashboard = () => {
  const {access_token,removeState} = useStore();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn:()=>getUserInfoWithTokenApi(),
    
    enabled: access_token !=null && access_token != undefined
    
  })
  const handleLogout = ()=>{
    removeCookie("credential");
    removeState();
    toast.warn("با موفقیت خارج شدید")
    setTimeout(()=>navigate("/login"),1000)

  }
 
  return (
    
    <>
    <Header/>
    {isPending && <DashboardSkeleton/>}
    {error && <ErrorOnFetchApi/>}
    {data && (
       
        <div className='flex gap-5 p-5 items-center'>
        <div className='w-20'>
          <img src={data?.data?.avatar} alt="" className='rounded-full object-contain w-full' />
        </div>
        <div className='flex flex-col flex-1'>
          <div className='text-gray-500 '><p>{data?.data?.name} خوش آمدید</p></div>
        </div>
       <div>
       <button onClick={handleLogout} className='bg-red-600 rounded-md text-white px-4 py-2 flex gap-2 items-center '><LogoutIcon/><span>خروج</span></button>
       </div>

        </div>

       
    )}
    </>
    )
}

export default Dashboard