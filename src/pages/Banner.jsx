import { easeOut } from 'motion';
import { motion } from 'motion/react';
import React from 'react';
import team1 from '../../src/assets/images/img1.jpg'
import team2 from '../../src/assets/images/img3.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96 rounded-lg  dark:bg-gray-900 text-black dark:text-white">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='flex-1'>
    <motion.img
      src={team1}
      animate={{y:[50,100,50]}}
      transition={{duration:10,repeat:Infinity}}
      className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px]
       border-b-4 border-l-4 border-blue-500 shadow-2xl" />
       <motion.img
      src={team2}
      animate={{x:[100,150,100]}}
      transition={{duration:10,repeat:Infinity,delay:5}}
      className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px]
       border-b-4 border-l-4 border-blue-500 shadow-2xl" />
    </div>
    <div className='flex-1'>
      <motion.h1 
      animate= {{x:50}}
      transition={{duration:2, delay:1, ease:easeOut, repeat: Infinity}}
      
      className="text-5xl text-blue-500 font-bold">Learn & Colaborate<motion.span
      animate={{color:['#FF6F61','#FFD700','#FFD700']}}
      transition={{duration:1,repeat: Infinity}}
      > Together!</motion.span> </motion.h1>
      <p className=' py-6'>
      Learning is better together. Connect, collaborate, and conquer challenges with your study partners from around the world. Turn your group studies into success stories today!
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Banner;