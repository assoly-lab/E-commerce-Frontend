'use client'

import { Product } from "@/utils/Types"
import { motion,AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaListUl } from "react-icons/fa6"
import { IoGrid } from "react-icons/io5"
import GridItem from "./GridItem"
import ListItem from "./ListItem"


export default function ProductsList({products}:{products:Product[]}){
    const [productsList,setProductsList] = useState<Product[]>(products)
    const [isList,setIsList] = useState<Boolean>(true)
    const [isGrid,setIsGrid] = useState<Boolean>(false)
    
    console.log(productsList)
    const filterProductsList = (filter:string)=>{
        let sortedList = [...products]
        if(filter=='LowtoHigh'){
            sortedList = sortedList.sort((a:Product,b:Product)=>a.price - b.price)
            setProductsList(sortedList)
        }
        else if(filter == 'HightoLow'){
            sortedList = sortedList.sort((a:Product,b:Product)=>b.price - a.price)
            setProductsList(sortedList)
        }else if(filter == 'OldtoNew'){
            setProductsList(products)
        }else if(filter == 'NewtoOld'){
            sortedList = sortedList.sort((a: Product, b: Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            setProductsList(sortedList)
        }

    }

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
                <div className="filters">
                    <select onChange={(e)=>filterProductsList(e.target.value) } name="filers" id="filers" className="cursor-pointer py-2 px-2 bg-[#E73F10] text-white font-semibold">
                        <option value="OldtoNew">Date,old to new</option>
                        <option value="NewtoOld">Date,new to old</option>
                        <option value="LowtoHigh">Price,low to high</option>
                        <option value="HightoLow">Price,high to low</option>
                    </select>
                </div>
                <p className="md:text-lg font-semibold">Showing 1-{products.length} of {products.length} results</p>
            </div>
            <AnimatePresence>
            {isList &&
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="w-full flex flex-col gap-4">
                {productsList.length > 0 &&
                productsList.map((product:Product)=>{
                    return (
                        <ListItem key={product.id} product={product} />
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
                {productsList.length > 0 && Array.isArray(productsList) &&
                productsList.map((product:Product)=>{
                    return (
                        <GridItem key={product.id} product={product} />
                    )
                })

                }
            </motion.div>


            }
            </AnimatePresence>
            
        </div>
    )
}