'use client'

import React, { useState } from 'react';
import { Img, Product } from '@/utils/Types';
import Image from 'next/image';



export default function ProductSlider({product}:{product:Product}){
  const [mainImage,setMainImage] = useState<string>(product.main_image)
  const images:Img[] = [{image:product.main_image},...product.images]

 

  return (
    <div className="relative flex flex-col items-center">
      <div style={{zIndex:'0'}} className="mb-8">
                    <div className="w-screen md:w-auto">
                        <div className="pb-4 flex items-center justify-center overflow-hidden z-0">
                            <Image
                                width={570}
                                height={570}   
                                src={mainImage} 
                                alt={product.description!} 
                                className="w-[350px] h-[350px] md:w-[570px] md:h-[570px] z-0"
                                
                            />
                        </div>
                        <ul className="w-[90%] flex gap-4 pb-2 overflow-x-auto mx-auto">
                          {images.map((image:Img, index:number) => (
                              <li style={{}} key={index} className=" cursor-pointer border border-[#E73F10] min-w-[100px] group overflow-hidden rounded-md" onClick={()=>setMainImage((prev:string) => prev != image.image ? image.image: prev)}>
                                  <Image className='group-hover:scale-110 mx-auto' src={image.image} width={130} height={130} alt={product.name}/>
                              </li>
            ))}
        </ul>
                    </div>
      </div>
    </div>
  );
}