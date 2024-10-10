'use client'

import { AppContext } from "@/Contexts/AppContext";
import { fetchWithAuth } from "@/utils/Helpers";
import { Cartitem, CartObject, Product } from "@/utils/Types";
import Image from "next/image";
import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";




export default function QuickView(){
    const {setIsQuickView,productId,cartItems,setCartItems,setCartCount} = useContext(AppContext)
    const [product,setProduct] = useState<Product | null>(null)
    const [quantity,setQuantity] =useState<number>(1)
    const [showButton,setShowButton] = useState<Boolean>(false)
    const [isOpen,setIsOpen] = useState<Boolean>(false)
    const descRef = useRef<HTMLParagraphElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    const handleOnClick = async (item:Product)=>{
        const access = localStorage.getItem('access')
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
                
                if(access){
                    const response = await fetchWithAuth('http://localhost:8000/api/update/cartitem/',{
                        method:'PUT',
                        body:JSON.stringify({'product_id':item.id,'quantity':quantity})
                    })
                    if(response.ok){
                        const data = await response.json()
                        console.log(data)
                    }
                }
                
                toast.success("item's quantity is updated successfully!")
            }

        }else{

            setCartItems((prev:Cartitem[] | [])=> [...prev,{product:item,quantity:quantity}])
            if(access){

                    const response = await fetchWithAuth('http://localhost:8000/api/create/cartitem/',{
                        method:'POST',
                        body:JSON.stringify({'cart_items':{
                            'id':item.id,
                            'quantity':quantity
                        }})
                    })
                    if(response.ok){
                        const data = await response.json()
                        console.log(data)
                    }
            }
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
    }

    let styles:CSSProperties = isOpen ? {height:isMobile ? '120px': '240px', overflowY:'scroll',padding:"0 10px 0 0"} : {overflow: 'hidden',
        display: '-webkit-box',
       WebkitBoxOrient : "vertical" ,
       WebkitLineClamp : '5'}
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const getProduct = async ()=>{
            try{
                const response = await fetch(`http://localhost:8000/api/product/${productId}/`)
                if(response.ok){
                    const data = await response.json()
                    setProduct(data[0])
                }
            }catch(error){
                console.log(error)
            }
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
          };
      
        handleResize();
        getProduct()
        window.addEventListener('resize', handleResize);

        return () => {
          document.body.style.overflow = 'auto'; 
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      useEffect(()=>{
        if(descRef.current){
            
            setShowButton(descRef.current.scrollHeight > descRef.current.clientHeight)
        }

      },[product])

    return (
        <>
        {  product && 
            <div onClick={(e)=>{
                e.stopPropagation()
                setIsQuickView(false)}} className=" overlay fixed inset-0 w-full h-full flex justify-center items-center bg-black/35 z-50 overflow-hidden">
                
                <div onClick={(e)=>e.stopPropagation()} className="relative w-[90%] md:w-[70%] md:h-fit bg-white p-8 flex flex-col md:flex-row rounded-xl">
                <IoCloseOutline onClick={()=>setIsQuickView(false)} className="absolute right-2 top-2 text-red-600 cursor-pointer h-8 w-8" />
                <div className="image flex flex-1 items-center">
                        <Image className="h-[300px] w-[300px] mx-auto md:w-[434px] md:h-[434px]" src={product.main_image}  width={434} height={434}  alt={product.name}/>
                    </div>
                    <div className="infos text-black flex-1 flex flex-col  gap-4">
                        <p className="text-xl md:text-3xl line-clamp-1">{product.name}</p>
                        <p className="text-center font-semibold md:text-start w-fit text-white bg-[#E73F10] px-2">{product.price} MAD</p>
                        <div className="desc">
                            <p className="font-medium text-md">Description</p>
                            <p style={styles} ref={descRef} >{product.description}</p>
                            {showButton && <button onClick={()=>setIsOpen(!isOpen)} className="bg-[#E73F10] w-fit text-white py-2 px-2 rounded-lg text-xs mt-4">{isOpen ? "Read Less..." : "Read More..."}</button>}
                        </div>
                        <div className="add-cart flex gap-8 justify-center">
                            <div className="quantity text-2xl border border-gray-300 ">
                                <span className="px-[12px] bg-red-500 font-bold cursor-pointer" onClick={()=>{
                                    quantity != 0 && quantity > 1 && setQuantity(prev=>prev - 1)
                                }}>-</span>
                                <span className="px-4">{quantity}</span>
                                <span className="px-2 bg-green-400 cursor-pointer" onClick={()=>{setQuantity((prev:number)=>{
                                    if(product.stock > prev ){
                                        return prev + 1 
                                    }else{
                                        toast.error("You have reached the available quantity in the stock!")
                                        return prev
                                    }
                                } )}}>+</span>
                            </div>
                            <button onClick={()=>{
                                handleOnClick(product)
                                
                            }} className="text-white font-semibold px-2 py-1 rounded-md bg-[#e36643] hover:bg-[#E73F10]">Add To Cart</button>
                        </div>
                    </div>
                    
                    
                </div>
            </div>}
        </>
    )
}