import Image from "next/image"
import {motion} from 'framer-motion'
import { Product } from "@/utils/Types"
import { FaRegEye } from "react-icons/fa"
import { LiaCartPlusSolid } from "react-icons/lia"


export default function NewArrivalItem({item}:{item:Product}){
    return (<>
            {item && 
                    <div key={item.id}>
                    <div className="relative bg-white rounded-xl py-4 px-2 md:py-4 md:pl-4 flex group" >
                            <Image className=" transition duration-500 ease-in-out group-hover:opacity-0 md:my-0 md:mx-auto" src={item.main_image} width={220} height={220} alt={item.name} />
                            <Image className="absolute opacity-0 top-0 left-0 md:top-[16px] md:my-0  md:left-[44px] transition duration-300 ease-in-out group-hover:opacity-100" src={item.images![0].image ? item.images![0].image : item.main_image} width={220} height={220} alt={item.name} />
                            

                            <motion.div className="absolute inset-0 flex flex-col justify-end items-center bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    initial={{ y: 30, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                            >
                                <div className="space-x-4">
                                    <button className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors"><FaRegEye className="w-[26px] h-[26px]" /></button>
                                    <button className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors"> <LiaCartPlusSolid className="w-[26px] h-[26px]" /></button>
                                    
                                </div>
                            </motion.div>    

                    </div>
                    <h2 className="md:text-xl mt-2 hover:text-[#E73F10] cursor-pointer">{item.name}</h2>
                    <p className="text-base mt-2 text-white  bg-[#E73F10] px-2 rounded-lg w-fit mx-auto">{item.price} dh</p>
                   </div>
            }
            
            </>
    )
}