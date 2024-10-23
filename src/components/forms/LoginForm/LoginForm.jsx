import React, { useEffect,useState } from 'react'
import{useForm}  from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import loginApi from '../../../utils/apis/auth/loginApi';
import {toast} from "react-toastify"
import { setCookie } from '../../../utils/helpers/cookie';
import useStore from '../../../store';
import { useNavigate,Link } from 'react-router-dom';


const loginSchema = z.object({
    email: z.string().min(1,"ایمیل اجباری می باشد").email("ایمیل معتبر نمی باشد"),
    password: z.string().min(1,"رمز عبور اجباری می باشد")
})

const LoginForm = () => {
    const {setState,access_token} = useStore();
    const navigate = useNavigate();

    const{register,handleSubmit,formState:{
        errors,
        isSubmitting
    }}= useForm({resolver:zodResolver(loginSchema)})

    console.log(access_token);

    useEffect(() => {
        if (access_token !=null && access_token != undefined) {
        toast.warn("شما قبلا وارد شدید")

          navigate("/dashboard")
        }
      }, []);
    const handleLogin = async(data)=>{

      
            const result = await loginApi(data);
            if(result?.status === 200 || result?.status === 201){
                const access_token = result?.data?.access_token;
                const refresh_token = result?.data?.refresh_token;
                await setCookie("credential",{
                    access_token,
                    refresh_token
                })
                setState({access_token,refresh_token})
                toast.success("خوش آمدید");
                setTimeout(()=>navigate("/dashboard"),1000)
                navigate("/dashboard")

            }else{
                toast.error("نام کاربری یا رمز عبور اشتباه است")
               
            }

        
           

        



    }
  return (
    <form
    onSubmit={handleSubmit(async(data)=>await handleLogin(data))}
     className={`shadow-md p-4 rounded-xl border-2  lg:w-[25%] w-[80%]`}>
        <fieldset className='flex flex-col gap-4' disabled={isSubmitting}>

        <input 
        {...register("email")}
        
        type="text" name='email' placeholder='ایمیل ' className={` ${errors?.email?.message ? "border-1 bg-red-400":"bg-red-400"}w-[100%] py-2 px-4 outline-none rounded-md`}/>
        {errors?.email?.message &&(
            <p className='text-red-500'>{errors.email.message}</p>
        )}
        <input
        {...register("password")}

         type="password"  name='password' placeholder='رمز عبور' className='w-[100%] py-2 px-4 outline-none rounded-md ' />
         {errors?.password?.message &&(
            <p className='text-red-500'>{errors.password.message}</p>
        )}
        <button type='submit' className='w-[100%] bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-500 transition-all'>{isSubmitting ? "در حال ورود":"ورود"}</button>
        </fieldset>
        <Link className='text-center py-4 block text-gray-500' to={"/signup"}>حساب کاربری ندارید؟ | ثبت نام</Link>



    </form>
  )
}

export default LoginForm