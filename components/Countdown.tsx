'use client'
import React, { useState, useEffect } from 'react';
import { TimeLeft } from '@/utils/Types';
const Countdown = ({ targetDate }:{targetDate:string}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft:TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center space-x-4">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <span className="text-4xl font-bold" suppressHydrationWarning>{timeLeft.days}</span>
        <span className="text-lg">Days</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <span className="text-4xl font-bold" suppressHydrationWarning>{timeLeft.hours}</span>
        <span className="text-lg">Hrs</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <span className="text-4xl font-bold" suppressHydrationWarning>{timeLeft.minutes}</span>
        <span className="text-lg">Mins</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <span className="text-4xl font-bold" suppressHydrationWarning>{timeLeft.seconds}</span>
        <span className="text-lg" >Secs</span>
      </div>
    </div>
  );
};

export default Countdown;