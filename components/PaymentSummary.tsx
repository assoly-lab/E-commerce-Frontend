'use client'

import { AppContext } from "@/Contexts/AppContext"
import { Cartitem } from "@/utils/Types"
import { useContext, useEffect, useState } from "react"


export default function PaymentSummary(){
    const {cartItems,setCartItems,subTotal,setSubTotal} = useContext(AppContext)
    const [isSummary,setIsSummary] = useState<Boolean>(false)
    const [itemsNumber,setItemsNumber] = useState<number>(0)

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
        </>
    )
}