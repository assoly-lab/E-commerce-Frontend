'use client'
import { AppContext } from "@/Contexts/AppContext";
import { Cartitem, CartObject, Product } from "@/utils/Types";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function AddToCart({item}:{item:Product}){
    const [quantity,setQuantity] = useState<number>(1)
    const {cartItems,setCartItems,setCartCount} = useContext(AppContext)

    if(!item){
        return null
    }

    useEffect(()=>{
        
        const handleCartItems =  async (data:number[],items:CartObject[])=>{
            try {
                const response = await fetch('http://localhost:8000/api/cart/',{
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
                    console.log(data)
                    const objects = data.map((obj:Product,index:number)=> {return {quantity:items[index].quantity,product:obj}} )
                    setCartItems(objects)
                }
            }catch(error){
                console.log(error)
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


    const handleOnClick = (item:Product)=>{
        if( quantity > item.stock){
            toast.error(`only ${item.stock} items are left in the stock`)
            return
        }
        if (cartItems.find((product:Cartitem)=>product.product.id === item.id)){
            if(cartItems.find((product:Cartitem)=>product.product.id === item.id && product.quantity === quantity)){
                toast.error('Item already added to cart!')
            }
            if(cartItems.find((product:Cartitem)=>product.product.id === item.id && product.quantity != quantity)){
                const updatedItems = cartItems.map((product:Cartitem)=>{
                    if(product.product.id === item.id){
                        return {
                            ...product,
                            quantity:quantity
                        }
                    }
                    return product
                })
                setCartItems(updatedItems)
                toast.success("item's quantity is updated successfully!")
            }

        }else{

            setCartItems((prev:Cartitem[] | [])=> [...prev,{product:item,quantity:quantity}])
            setCartCount((prev:number) => prev + 1)
            toast.success('Item added to cart successfully!')
        }


        const data = localStorage.getItem('cart')
        if(data){
            const products = JSON.parse(data)
            if(products.find((product:CartObject)=>product.id === item.id && product.quantity ===quantity)){
                return
            }else if(products.find((product:CartObject)=>product.id === item.id && product.quantity !== quantity)){
                const updatedLocalItems = products.map((product:CartObject)=>{
                    if(product.id === item.id){
                        return {
                            ...product,
                            quantity:quantity
                        }
                    }
                    return product
                })
                localStorage.setItem('cart',JSON.stringify(updatedLocalItems))
                toast.success('locals Updated !')
            }
            else{
                const products = JSON.parse(data)
                localStorage.setItem('cart',JSON.stringify([...products,{quantity:quantity,id:item.id}]))
                toast.success('local added !')
            }
        }
        // const data = localStorage.getItem('cart')
        // if(data){
        //     const localItems = JSON.parse(data)
        //     if(localItems.find((product:CartObject)=>product.id === item.id && product.quantity != quantity)){
        //         const updatedLocalItems = localItems.map((product:CartObject)=>{
        //             if(product.id === item.id){
        //                 return {
        //                     ...product,
        //                     quantity:quantity
        //                 }
        //             }
        //             return product
        //         })
        //         localStorage.setItem('cart',JSON.stringify(updatedLocalItems))
        //         toast.success('locals Updated!')
        //     }
        // }


    }


    return (
        <>
            <div className="quantity w-fit h-fit text-2xl border border-gray-300 md:h-fit ">
                <span className="px-[12px] bg-red-500 font-bold cursor-pointer" onClick={()=>{
                    if(quantity != 1 && quantity > 1){
                        setQuantity((prev:number)=>prev - 1)
                }
                }}>-</span>
                <span className="px-4">{quantity}</span>
                <span className="px-2 bg-green-400 cursor-pointer" onClick={()=>{
                    
                    setQuantity((prev:number)=> {
                        if(item.stock > prev){
                            return prev + 1
                        }else{
                            toast.error("You have reached the available quantity in the stock!")
                            return prev
                        }
                    })
                }}>+</span>
            </div>
            <button onClick={()=>handleOnClick(item)} className="bg-[#E73F10] text-white font-semibold px-2 py-2 rounded-md">Add to cart</button>
        </>
    )
}