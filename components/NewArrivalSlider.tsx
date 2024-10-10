'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/utils/Types";
import FeaturedItem from "./FeaturedItem";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import {motion} from 'framer-motion'
import { useState } from "react";


export default function NewArrivalSlider({items}:{items:Product[]}){
    const [isHovered, setIsHovered] = useState(false);
    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <motion.div
            className="hidden  md:block absolute top-1/2 -left-12 md:-left-2 transform -translate-y-1/2 text-white  z-10 cursor-pointer bg-[#E73F10] rounded-lg opacity-0 group-hover:opacity-100" onClick={onClick}
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
            className="hidden  md:block absolute top-1/2 -right-12 md:-right-2 transform -translate-y-1/2  text-white z-10 cursor-pointer bg-[#E73F10] rounded-lg opacity-0 group-hover:opacity-100" onClick={onClick}
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
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:true,
        centerMode:true,
        centerPadding: "10px",
        prevArrow: <PrevArrow  />,
        nextArrow: <NextArrow  />,
        aappendDots: (dots:React.ReactNode[]) => (
            <ul className="custom-dots w-full flex justify-center">
                {dots.map((dot:React.ReactNode, index:number) => (
                    <li key={index} className="">
                        {dot}
                    </li>
                ))}
            </ul>
        ),
        customPaging: (i: number) => (
            <button className="before:!text-base before:!text-red-500 md:before:!text-base "></button> // Default gray color for inactive dots
        ),
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                arrows:false,
                slidesToScroll: 1,
                centerMode:false
              },
            },
          ],
    };



    return (
        <div className="relative w-[80%] my-0 mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <Slider {...settings}>
                {
                    items.map((item:Product)=>{
                        return(
                            <FeaturedItem key={item.id} item={item} />
                        )
                    })
                }
            </Slider>
        </div>

    )


}