'use client'

import React, { useState, useEffect} from "react";
import { FaEye } from "react-icons/fa";



export default function Views(){

    const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const updateViewers = () => {
      // Generate a random number between 20 and 40
      const randomViewers = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
      setViewers(randomViewers);
    };

    // Update every 7 seconds (7000 milliseconds)
    const intervalId = setInterval(updateViewers, 7000);

    // Call it immediately on component mount
    updateViewers();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="viewers-count  flex gap-4 py-4 border-b border-gray-200 items-center">
      <FaEye className="h-6 w-6 mt-[5px]" />
      <p><span className="font-semibold">{viewers}</span> people are viewing this right now</p>
    </div>
  );
};
