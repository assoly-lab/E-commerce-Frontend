'use client'

import { CategoryCountsList } from "@/utils/Types"
import { motion,AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaListUl } from "react-icons/fa6"
import { IoGrid } from "react-icons/io5"
import CategoryGridItem from "./CategoryGridItem"
import CategoryListItem from "./CategoryListItem"



export default function CategoriesList({categories}:{categories:CategoryCountsList[]}){
    const [isList,setIsList] = useState<Boolean>(true)
    const [isGrid,setIsGrid] = useState<Boolean>(false)
    

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center mb-4">
                <div className="icons flex gap-4 ">
                    <FaListUl onClick={()=>{
                        setIsList(true)
                        setIsGrid(false)
                        }} style={{color: isList ? '#E73F10' : 'black' }} 
                        className="w-8 h-8 cursor-pointer hover:!text-[#E73F10]" />
                    <IoGrid onClick={()=>{
                        setIsList(false)
                        setIsGrid(true)
                        }} style={{color: isGrid ? '#E73F10' : 'black' }} 
                        className="w-8 h-8 cursor-pointer hover:!text-[#E73F10]" />
                </div>
                <p className="md:text-lg font-semibold">Showing 1-{categories.length} of {categories.length} results</p>
            </div>
            <AnimatePresence>
            {isList &&
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="w-full flex flex-col gap-4">
                {categories.length > 0 && Array.isArray(categories) &&
                categories.map((category:CategoryCountsList)=>{
                    return (
                        <CategoryListItem category={category} />
                    )
                })

                }
            </motion.div>}
            </AnimatePresence>
            <AnimatePresence>
            {isGrid &&
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="grid grid-cols-1 md:grid-cols-3 gap-y-8 bg-gray-100 py-8 px-4">
                {categories.length > 0 && Array.isArray(categories) &&
                categories.map((category:CategoryCountsList)=>{
                    return (
                        <CategoryGridItem category={category} />
                    )
                })

                }
            </motion.div>


            }
            </AnimatePresence>
            
        </div>
    )
}