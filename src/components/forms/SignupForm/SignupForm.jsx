import React, { useEffect,useState } from 'react'
import{useForm}  from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../../../utils/apis/users/createUserApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useStore from '../../../store';

const signUpSchema = z.object({
    name:z.string(1,"نام اجباری است").min(4,"نام باید حداقل چهار حرف باشد"),
    email: z.string().min(1,"ایمیل اجباری می باشد").email("ایمیل معتبر نمی باشد"),
    password: z.string().min(4,"رمز عبور حداقل چهار کاراکتر باشد"),
    avatar: z.string(),
    gender:z.string()
}).refine(data => data.avatar =`https://avatar.iran.liara.run/public/${data.gender}`)

const SignupForm = () => {
    const navigate = useNavigate();
    const {access_token} = useStore();

    const{register,handleSubmit,formState:{
        errors,
        isSubmitting
    }}= useForm({resolver:zodResolver(signUpSchema)})

    useEffect(() => {
      if (access_token !=null && access_token !== undefined) {
      toast.warn("شما قبلا وارد شدید")

        navigate("/dashboard")
      }
    }, []);



    const handleSignup = async(data)=>{
       const result = await createUserApi(data);
       if(result?.status === 200 || result?.status === 201){
        toast.success("ثبت نام با موفقیت انجام شد ")
        setTimeout(()=>navigate("/login"),1000)

       }else{
        toast.error("مشکلی پیش آمده دوباره امتحان کنید")
       }
    
    }
  return (
    <form
    onSubmit={handleSubmit(async(data)=>await handleSignup(data))}
     className={`shadow-md p-4 rounded-xl border-2  lg:w-[25%] w-[80%]`}>
        <fieldset className='flex flex-col gap-4' disabled={isSubmitting}>
            <input type="hidden" name="avatar"{...register("avatar")} />
        <input 
        {...register("name")}
        
        type="text" name='name' placeholder='نام ' className={` ${errors?.name?.message ? "border-1 bg-red-400":"bg-red-400"}w-[100%] py-2 px-4 outline-none rounded-md`}/>
        {errors?.name?.message &&(
            <p className='text-red-500'>{errors.name.message}</p>
        )}

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
      <div className='flex flex-col'>
      <div className='flex gap-4 items-center'>
        <input type="radio" name='gender' id='male' value={"boy"} defaultChecked={true} {...register("gender")} />
        <label htmlFor="male" className='text-gray-600 flex-grow'>مرد</label>
      </div>
      <div className='flex gap-4 items-center'>
        <input type="radio" name='gender' id='female' value={"girl"} {...register("gender")} />
        <label htmlFor="female" className='text-gray-600 flex-grow'>زن</label>
      </div>
    </div>
        <button type='submit' className='w-[100%] bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-500 transition-all'>{isSubmitting ? "در حال ثبت نام":"ثبت نام"}</button>
        </fieldset>

        <Link className='text-center py-4 block text-gray-500' to={"/login"}>حساب کاربری دارید؟ | ورود</Link>


    </form>
  )
}

export default SignupForm