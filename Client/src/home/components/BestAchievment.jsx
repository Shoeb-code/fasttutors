import React from 'react'
import { assets } from '../../assets/assets'
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { TbDeviceIpadSearch } from "react-icons/tb";


function BestAchievment() {
  return (
    <div className='bg-gray-950 border-2 m-5 rounded-2xl'>
         <div className='flex    border-amber rounded-2xl m-3 p-3'>
            <div className='text-white m-4 p-4 space-y-6 w-[50%] items-center ' >
                <h1 className='text-3xl font-bold '>Our Best Achievements</h1>
                <ul className='space-y-4 text-[16px] p-3 bg-gray-900  rounded-2xl text-gray-300'>
                  <li>1. Growing User base: It demonstrates the faith of Students and teachers in our credible Services.
                </li>
                <li>2. Successful Tutor-Student Matches: It shows our ability as a bridge to fulfill the requirements of both the students and the teachers.
                </li>
                <li>3. Positive Feedback and Testimonials: It reflects tutoring services' quality and builds trust in our services.
                </li>
                <li>
                4. Improved Academic Performance: Highlights success stories and showcase tangible results that are compelling for potential users.
                </li>
                </ul>
            </div>
            {/* image section */}
            <div className=' p-2  '>
                 <img src={assets.boy} alt="img" className='h-[350px]   rounded-2xl ' />
            </div>
         </div>
         <div className=' flex m-3 p-2 justify-center gap-48 items-center'>
            <div className='  bg-gray-900 m-2 p-5 w-2xs flex items-center  text-center rounded-2xl gap-10'>
              <FaChalkboardTeacher className='text-amber-400 text-5xl  flex flex-wrap' />
              <div ><h1 className='font-bold text-2xl text-amber-50'>48000+</h1>
                  <h2 className='text-white text-[20px]'>Expert Tutors</h2></div>
            </div>

            <div className='bg-gray-900 m-2 p-5 w-2xs flex items-center  text-center rounded-2xl gap-10'>
              <GoTrophy  className='text-green-500 text-5xl flex' />
              <div ><h1 className='font-bold text-2xl text-amber-50'>21000+</h1>
                  <h2 className='text-white text-[20px]'>Total Students</h2></div>
            </div>

            <div className='bg-gray-900 m-2 p-5 w-2xs flex items-center  text-center rounded-2xl gap-10'>
              <TbDeviceIpadSearch  className='text-blue-500 text-5xl flex' />
              <div ><h1 className='font-bold text-2xl text-amber-50'>28000+</h1>
                  <h2 className='text-white text-[20px]'>Enquiry Served</h2></div>
            </div>

         </div>
    </div>
  )
}

export default BestAchievment
