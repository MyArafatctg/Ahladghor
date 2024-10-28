import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum enim, sunt, obcaecati tempora quaerat suscipit quibusdam voluptatum eum, similique ipsa eaque voluptate. Quae debitis, sint ab ullam adipisci ex eos.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente iure, natus quasi, doloremque neque aliquam distinctio nihil architecto dolor facere pariatur optio voluptatibus, facilis ex quas a cumque reprehenderit ullam?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, a. Sed neque dicta corporis expedita quos non excepturi, labore voluptas tenetur assumenda consequatur ad quisquam fuga veniam necessitatibus provident ratione!</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam dicta deserunt modi, at fugiat doloremque voluptas repellat, error blanditiis, quasi autem? Quae distinctio hic eveniet. Ex iure fuga voluptates!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam dicta deserunt modi, at fugiat doloremque voluptas repellat, error blanditiis, quasi autem? Quae distinctio hic eveniet. Ex iure fuga voluptates!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam dicta deserunt modi, at fugiat doloremque voluptas repellat, error blanditiis, quasi autem? Quae distinctio hic eveniet. Ex iure fuga voluptates!</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About
