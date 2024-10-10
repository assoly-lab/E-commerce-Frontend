'use client'

import { IoIosArrowDown } from "react-icons/io";
import { AppContext } from "@/Contexts/AppContext"
import { useContext, useEffect, useState } from "react"
import { Cartitem, CartObject, Product } from "@/utils/Types";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion"


export default function OrderSummary(){
    const {cartItems,setCartItems,subTotal,setSubTotal} = useContext(AppContext)
    const [isSummary,setIsSummary] = useState<Boolean>(false)
    const [itemsNumber,setItemsNumber] = useState<number>(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ 
        const handleCartItems =  async (data:number[],items:CartObject[])=>{
            if(cartItems.length == 0){
            try {
                const response = await fetch('https://abdo008.pythonanywhere.com/api/cart/',{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    } ,
                    body:JSON.stringify({
                        product_ids:data,
                    })
                })
                if(response.ok){
                    const data = await response.json()
                    const objects = data.map((obj:Product,index:number)=> {return {quantity:items[index].quantity,product:obj}} )
                    setCartItems(objects)
                }
            }catch(error){
                console.log(error)
            }
        }
    }
        if(cartItems.length == 0){
            const data = localStorage.getItem('cart')
            if(data){
                const items = JSON.parse(data)
                const ids = items.map((item:CartObject)=> item.id)
                handleCartItems(ids,items)
            }
            }
    },[])

    useEffect(()=>{
        const items = cartItems.reduce((acc:number,item:Cartitem)=>{
            return acc + item.quantity 
            
        },0)
        const total = cartItems.reduce((acc:number,item:Cartitem)=>{
            return acc + (item.quantity * parseFloat(item.product?.price.toString()))
            
        },0)
        setSubTotal(total)
        setItemsNumber(items)


    },[cartItems])
    return (
        <>
            <div className="w-full flex justify-between bg-slate-100 px-4 border-y border-gray-200 py-6">
                <button onClick={()=>setIsSummary(!isSummary)} className="">Show order summary <IoIosArrowDown className="inline" /> </button>
                <p className="subtotal">{subTotal}.00 MAD</p>
            </div>
            <AnimatePresence>
            {isSummary && 
            <motion.div 
            initial={{height:0,opacity:0}}
            animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}}
            className=" border-b border-gray-200 bg-gray-100">
                {cartItems &&
                cartItems.map((item:Cartitem)=>{
                    return (
                        <div key={item.product.id} className="relative px-4 flex justify-between gap-8">
                            <span className="absolute left-20 top-0.5 bg-[#E73F10] px-2 rounded-full text-white font-medium">{item.quantity}</span>
                            <div className="flex-2 infos flex items-center gap-4">
                                <Image src={item.product.main_image} width={80} height={80} alt={item.product.name} />
                                <p className="text-sm">{item.product.name}</p>
                            </div>
                            <div className="price flex-1 flex items-center">
                                <p className="whitespace-nowrap">{item.product.price} MAD</p>
                            </div>
                        </div>
                    )
                })
                }
                <div className="payment-info flex flex-col gap-2 mt-8 pb-8">
                    <div className="subtotal px-4 flex justify-between text-sm">
                        <p>Subtotal <span>( items {itemsNumber})</span></p>
                        <p>{subTotal}.00 MAD</p>
                    </div>
                    <div className="shipping px-4 flex justify-between text-sm">
                        <p>Shipping</p>
                        <p>0.00 MAD</p>
                    </div>
                    <div className="total px-4 flex justify-between text-2xl font-semibold">
                        <p>Total</p>
                        <p>{subTotal}.00 MAD</p>
                    </div>
                </div>
            </motion.div>
            }
            </AnimatePresence>
        </>
    )
}