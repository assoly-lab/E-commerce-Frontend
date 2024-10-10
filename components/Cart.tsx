import { AppContext } from "@/Contexts/AppContext"
import { Cartitem, Product } from "@/utils/Types";
import { useContext, useEffect, useRef, useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
import CartItem from "./CartItem";
import {CartObject} from "@/utils/Types"
import Link from "next/link";
import {motion} from 'framer-motion'



export default function Cart(){
    const {setIsCart,cartItems,setCartItems,isCart,subTotal,setSubTotal} = useContext(AppContext)
    const [isLoading,setIsLoading] = useState<Boolean>(false)
    const ref = useRef<HTMLDivElement>(null)
    const [style,setStyle] = useState({})

// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        
        const handleCartItems =  async (data:number[],items:CartObject[])=>{
            setIsLoading(true)
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
                    setIsLoading(false)
                    setCartItems(objects)
                }
            }catch(error){
                setIsLoading(false)
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
    
    useEffect(()=>{
        
        if (ref.current){
            if(ref.current.scrollHeight > 396 ){
                setStyle({overflowY: 'scroll'})
            }else{
                setStyle({overflowY: 'auto'})
            }
        }
    },[ref.current?.scrollHeight])

    
    useEffect(()=>{
        const total = cartItems.reduce((acc:number,item:Cartitem)=>{
            return acc + (item.quantity * parseFloat(item.product?.price.toString()))
            
        },0)
        setSubTotal(total)

    },[cartItems,setSubTotal])

    return (
            <motion.div 
            initial={
                {
                clipPath:'circle(0% at 100% 0%)',
                }
            }
            animate={{
                clipPath:'circle(150% at 100% 100%)'
            }}
            exit={{
                clipPath:'circle(0% at 100% 0%)',
                transition :{ duration: 0.5, delay: 0.3 }
            }}
            transition={{ duration: 0.5 }}
            onClick={()=>setIsCart(false)} className="overlay bg-black/40 fixed inset-0  w-full z-50 min-h-screen flex justify-end">
                <motion.div  
                initial={{ opacity: 0, x: 100 }} // specify initial position to be outside the screen on the left
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, transition:{duration:0.2} }}
                transition={{ duration: 0.2, delay: 0.3 }}
                onClick={(e)=>e.stopPropagation()} className="relative w-[70%] md:w-[30%] h-screen bg-white">
                    <div className="flex justify-between px-4 py-8 border border-b-gray-300">
                        <p className="font-medium text-lg">Cart</p>
                        <IoCloseOutline onClick={()=>{setIsCart(false)}} className="w-6 h-6 hover:text-red-600 cursor-pointer"  />
                    </div>
                    <div ref={ref} style={style} className="cart-items ml-4 mt-4 max-h-[396px] md:pr-4">

                        { cartItems.length != 0 ?
                            
                            cartItems.map((item:Cartitem)=>{
                                return (
                                    item.product && <CartItem key={item.product?.id} item={item} />
                                )
                            })

                            :
                        <p className="text-lg">{isLoading ? 'Loading...' : 'Your cart is currently empty'}</p>

                        }
                    </div>
                    {
                            cartItems.length != 0 && 
                            <>
                                <div className="sub-total flex justify-between border-y border-y-gray-200  p-4">
                                    <p className="font-semibold">subtotal:</p>
                                    <p className="text-[#E73F10] font-semibold">{subTotal},00 MAD</p>
                                </div>
                                <div className="act-btn w-[80%] flex gap-4 mx-auto my-4 text-white">
                                    <Link className="flex flex-1 bg-[#E73F10] justify-center rounded-sm font-semibold text-xl" href={'/cart'}><button onClick={()=>{setIsCart(false)}} className=" bg-[#E73F10] py-1">View Cart</button></Link>
                                    <Link className="flex flex-1 bg-[#E73F10] justify-center rounded-sm font-semibold text-xl" href={'/checkout'}><button className="flex-1 bg-[#E73F10] py-1">Checkout</button></Link>
                                </div>
                                <p className="text-center">Free Shipping on All Orders Over 1000 MAD !</p>
                            </>
                        }
                </motion.div>
            </motion.div>
    )
}