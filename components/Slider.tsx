'use client'
import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from '@/Contexts/AppContext';
import Image from 'next/image';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Category } from "@/utils/Types"
import Link from 'next/link';





export default function AnimatedSlider(){
    const {categories,setCategories} = useContext(AppContext)
    const [isLoading,setIsLoading] = useState<Boolean>(false)
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const getCategories = async ()=>{
        if(categories == undefined){

            setIsLoading(true)
        try{
            const response = await fetch('http://localhost:8000/api/categories/')
            if(response.ok){
                const data = await response.json()
                setCategories(data)
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
        
    }

    }
    useEffect(()=>{
        getCategories()
    },[])



    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <motion.div
            className="hidden  md:block absolute top-1/2 -left-12 md:-left-24 transform -translate-y-1/2 text-black  z-10 cursor-pointer hover:bg-white hover:rounded-full opacity-0 group-hover:opacity-100" onClick={onClick}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: isHovered ? 0 : '-100%', opacity: isHovered ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GrFormPrevious className='w-8 h-8'  />
            </motion.div>
        );
    };
    
    const NextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <motion.div
            className="hidden  md:block absolute top-1/2 -right-12 md:-right-24 transform -translate-y-1/2  text-black z-10 cursor-pointer hover:bg-white hover:rounded-full opacity-0 group-hover:opacity-100" onClick={onClick}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: isHovered ? 0 : '100%', opacity: isHovered ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GrFormNext className='w-8 h-8 '  />
            </motion.div>
        );
    };









    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current:number) => setActiveSlide(current), // Track the active slide
        arrows:true,
        fade:true,
        prevArrow: <PrevArrow  />,
        nextArrow: <NextArrow  />,
        // aappendDots: (dots:React.ReactNode[]) => (
        //     <ul className="custom-dots w-full flex justify-center">
        //         {dots.map((dot:React.ReactNode, index:number) => (
        //             <li key={index} className="">
        //                 {dot}
        //             </li>
        //         ))}
        //     </ul>
        // ),
        customPaging: (i: number) => (
            <button className="before:!text-base before:!text-red-500 md:before:!text-base "></button> // Default gray color for inactive dots
        ),
    };
    

    return (
        <div onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className='w-[90%] min-h-screen rounded-md p-8 md:w-[90%] md:h-screen md:flex justify-center bg-[#EBEBEB] md:rounded-xl  md:mb-4 md:pt-16 '>
            <div className="md:w-[80%] md:flex md:flex-col md:h-[600px] group">
            <Slider {...settings}>
                {categories && categories.slice(0,5).map((category:Category,index:number) => (
                    <div key={category.id} className="md:w-full md:!flex md:flex-row-reverse pb-8 pr-4 ">
                        <div className="image-container flex-1 pb-4">
                            <Image
                                width={570}
                                height={570}   
                                src={category.image!} 
                                alt={category.description!} 
                                
                            />
                        </div>

                        {/* Description and Button */}
                        <div className="flex-1 flex">
                            <div
                                className="flex flex-col items-center justify-center gap-4 md:items-start overflow-hidden"
                            >
                                        <motion.h2
                                            className="text-2xl md:text-4xl text-black font-semibold"
                                            initial={{ opacity: 0, y: 0,x :0 }}
                                            animate={activeSlide === index ? { opacity: 1, y: 0} : { opacity: 0, y: -50 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            {category.name}
                                        </motion.h2>

                                        {/* Animate the description */}
                                        <motion.h2
                                            className="text-base md:text-xl text-black text-center md:text-start"
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={activeSlide === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                        >
                                            {category.description}
                                        </motion.h2>

                                        {/* Animate the button */}
                                        <Link href={`/category/${category.id}`}>
                                            {activeSlide === index  && <motion.button
                                                className="relative z-10 mt-4 px-6 py-2 bg-[#E73F10] text-white text-lg rounded overflow-hidden transition duration-300 hover:text-white before:absolute before:inset-0 before:bg-amber-400 before:w-0 before:h-full before:transition-all before:duration-300 hover:before:w-full before:z-0"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0,transition:{duration:0.2} }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                            >
                                                <span className="relative z-20">Shop Now</span>
                                            </motion.button>}
                                        </Link>
                                        
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
    );


}