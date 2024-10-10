'use client'

import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import { Img, Product } from '@/utils/Types';
import Image from 'next/image';



export default function ProductSlider({product}:{product:Product}){
  const [mainImage,setMainImage] = useState<string>(product.main_image)
  const images:Img[] = [{image:product.main_image},...product.images]

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    fade:true,
    appendDots: (dots:React.ReactNode[]) => (
        <ul style={{gap:"30px",margin:'0 auto'}} className="custom-dots w-[90%] mx-auto md:mx-0 md:w-[90%] flex justify-center">
            {images.map((image:Img, index:number) => (
                <li style={{width:"100px",cursor:"pointer"}} key={index} className=" cursor-pointer border border-gray-100" onClick={()=>setMainImage((prev:string) => prev != image.image ? image.image: prev)}>
                    <Image className='' src={image.image} width={100} height={100} alt={product.name}/>
                </li>
            ))}
        </ul>
    ),
    // customPaging: (i: number) => (
    //     <button className="before:!text-base before:!text-red-500 md:before:!text-base "></button> // Default gray color for inactive dots
    // ),
};

  return (
    <div className="relative flex flex-col items-center">
      {/* Main Image Slider */}
      <div style={{zIndex:'0'}} className="mb-8">
      <Slider {...settings}>
                    <div className="w-screen">
                        <div className="image-container flex-1 pb-4 flex items-center justify-center overflow-hidden z-0">
                            <Image
                                width={570}
                                height={570}   
                                src={mainImage} 
                                alt={product.description!} 
                                className="w-[350px] h-[350px] md:w-[570px] md:h-[570px] z-0"
                                
                            />
                        </div>
                    </div>
            </Slider>
      </div>
    </div>
  );
}