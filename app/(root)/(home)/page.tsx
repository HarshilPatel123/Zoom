"use client"

import MeetingTypeList from '@/components/ui/MeetingTypeList';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState('');
  const [Date1, setDate1] = useState('');

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US'));
      setDate1((new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run effect only once on component mount

  // Example of dynamic greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning !!!';
  if (hour < 18) return 'Good afternoon !!!';
  return 'Good evening !!!';
};




  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 max-lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-3xl  font-normal'>
           {getGreeting()}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{Date1}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
