'use client'
import { Cartitem, CartObject, Product } from "@/utils/Types";
import Image from "next/image";
import {motion} from "framer-motion"
import { LiaCartPlusSolid } from "react-icons/lia";
import { FaRegEye } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "@/Contexts/AppContext";
import toast from "react-hot-toast";
import Link from "next/link";



const handleCart = (id:number)=>{
    const cart = localStorage.getItem('cart')
    if (cart){
        const data: CartObject[] = JSON.parse(cart)
        const filter = data.some((obj:CartObject)=>obj.id === id)
        if(filter){
            return
        }
        data.push({quantity:1,id:id})
        localStorage.setItem('cart',JSON.stringify(data))
    }else{
        localStorage.setItem('cart',JSON.stringify([{quantity:1,id:id}]))
    }
}


export default function BestSellingItem({items}:{items:Product[]}){

    const {setIsQuickView,setProductId,cartItems,setCartItems,setCartCount} = useContext(AppContext)

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-4 rounded-xl px-4 pt-4">
            {items && items.map((item:Product)=>{
                return (
                    <div key={item.id}>
                    <div className="relative bg-white rounded-xl py-4 px-2 md:py-4 md:pl-4 flex group" >
                            <Image className=" transition duration-500 ease-in-out group-hover:opacity-0 md:my-0 md:mx-auto" src={item.main_image} width={220} height={220} alt={item.name} />
                            <Image className="absolute opacity-0 top-0 left-0 md:top-[16px] md:my-0  md:left-[44px] transition duration-300 ease-in-out group-hover:opacity-100" src={item?.images.length > 0 ? item.images[0].image : item.main_image} width={220} height={220} alt={item.name} />
                            

                            <motion.div className="absolute inset-0 flex flex-col justify-end items-center bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    initial={{ y: 30, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                            >
                                
                                <Link className="absolute top-0 left-0 w-[90%] mx-auto h-full z-40" href={`/product/${item.id}`}></Link>
                                <div className="relative flex gap-4 z-50">
                                    <button 
                                    onClick={(e)=>{
                                        e.stopPropagation()
                                        setIsQuickView(true)
                                        setProductId(item.id)
                                        }}
                                    className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors"><FaRegEye className="w-[26px] h-[26px]" /></button>
                                    <button 
                                    onClick={(e)=>{
                                        e.stopPropagation()
                                        handleCart(item.id)
                                        if(cartItems.find((product:Cartitem)=>product.product?.id == item.id)){
                                            toast.error('Item already added to cart!')
                                            return
                                        }
                                        setCartItems((prev:Product[] | [])=>[...prev,{quantity:1,product:item}])
                                        setCartCount((prev:number)=>prev + 1)
                                        toast.success('Item added to cart!')
                                    }} 
                                    className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors"> <LiaCartPlusSolid className="w-[26px] h-[26px]" /></button>
                                    
                                </div>
                                <p className="text-xl mt-2 text-white bg-[#E73F10] px-2 rounded-lg">{item.price} dh</p>
                            </motion.div>    

                    </div>
                    <h2 className="md:text-xl mt-2 hover:text-[#E73F10] cursor-pointer">{item.name}</h2>
                   </div>
                )
            })
            
            }
        </div>
    )
}