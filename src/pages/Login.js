import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const {token, setToken, nevigate} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        // Replace these with the actual values from your form inputs or state
         
        const response = await fetch("https://apex.oracle.com/pls/apex/ahladghor/auth/addUser", {
          method: 'POST',
          body: new URLSearchParams({
            fullName: name,
            username: userName,
            password: password,
          }),
        });        
  
        if (response.status === 400) {
          toast.error('user already existed!');
        }else{
          const data = await response.json();
          setToken(data.token);
          localStorage.setItem('token', data.token);
          toast.success('user created successfully!');
        }
        // console.log('User added successfully:', token);
      } else {
        const response = await fetch(`https://apex.oracle.com/pls/apex/ahladghor/auth/getToken?userName=${userName}&password=${password}`); 

        const data = await response.json();
        if(data.success){
          setToken(data.token);
          localStorage.setItem('token', data.token);
        }else{
          toast.error(data.message);
        }

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  useEffect(()=>{
    if (token){
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        if(redirectPath){
          localStorage.removeItem('redirectAfterLogin');
          nevigate(redirectPath);
        }else nevigate('/')
    }
  },[nevigate,token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot yur password?</p>
        {
          currentState === 'Login' 
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> 
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
