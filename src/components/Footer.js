import React from 'react'
import {assets} from '../assets/frontend_assets/assets';

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img className='w-56' src={assets.logo} alt="" />
            <p className='w-full sm:w-2/3 text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat autem quod quis, nihil eligendi ut expedita natus at in laudantium? Sunt maxime doloremque quasi totam tempore quibusdam non. Aliquam, voluptatum?</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About US</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+880 1855 283491</li>
                <li>myarafat.ctg@gmail.com</li>
            </ul>
        </div> 
      </div>
      <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright {year}@ - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
