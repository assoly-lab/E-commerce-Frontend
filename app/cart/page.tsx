'use client'
import FeaturedSlider from "@/components/FeaturedSlider";
import { AppContext } from "@/Contexts/AppContext";
import { Cartitem, CartObject, Product } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";


export default function CartPage(){
    const {cartItems,setCartItems,subTotal,setSubTotal} = useContext(AppContext)
    const [featuredItems,setFeaturedItems] = useState<Product[] | []>([])

    useEffect( ()=>{
        const getFeaturedProducts = async ()=>{
            const response = await fetch('http://localhost:8000/api/best-selling/')
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setFeaturedItems(data)
            }
          }
          getFeaturedProducts()
    },[])


    useEffect(()=>{
        const total = cartItems.reduce((acc:number,item:Cartitem)=>{
            return acc + (item.quantity * parseFloat(item.product?.price.toString()))
            
        },0)
        setSubTotal(total)

    },[cartItems])

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

    return (
        <>
        <div className=" bg-gray-200 py-4 mb-6 flex justify-center">
            <p className="text-2xl font-semibold">Your shopping cart</p>
        </div>
        <div className="w-full flex flex-col items-center gap-4 py-4 mb-4">
            {
            cartItems.map((item:Cartitem,index:number)=>{
                return <CartPageItem key={index} item={item} />
            })
            
            }
        </div>
        <div className="w-full flex justify-center gap-6 text-white font-medium text-lg mb-6">
            <Link href={'/'} className="bg-[#E73F10] p-2 rounded-md"> <button>Continue shopping</button> </Link>
            <button className="bg-[#E73F10] p-2 rounded-md" onClick={()=>{
                setCartItems([])
                localStorage.removeItem('cart')
            }}>Clear Cart</button>
        </div>
        <div className=" w-full px-8 my-4 md:w-[40%] md:mx-auto ">
            <p className="text-xl font-medium md:text-center">Cart totals</p>
            <div className="subtotal mt-2 flex items-center w-full text-lg border border-gray-200 ">
                <p className="flex-1 py2 pl-2 border-r ">Subtotal</p>
                <p className="flex-1 py-2 pl-2">{subTotal},00 MAD</p>
            </div>
            <div className="total flex items-center w-full text-lg bg-[#EBEBEB60] text-black">
                <p className="flex-1 py-2 pl-2">Total</p>
                <p className="flex-1 py-2 pl-2 font-semibold">{subTotal},00 MAD</p>
            </div>
            <Link className="md:mx-auto" href={'/checkout'}><button className="w-full  bg-[#E73F10] mt-4 text-white py-2 rounded-md text-lg font-medium">Proceed to checkout</button></Link>
        </div>
        <div className="mt-16 mb-8">
            <p className="text-center text-2xl font-semibold ">Featured Products</p>
            {featuredItems.length != 0 && <FeaturedSlider items={featuredItems} />}
        </div>
        </>
    )
}




const CartPageItem = ({item}:{item:Cartitem})=>{

    if(!item){
        return null
    }

    const IncrementUpdate = ()=>{
        const updatedItems = cartItems.map((obj:Cartitem)=>{
            if(obj.product?.id == item.product?.id){
                const updatedobj = {
                    ...obj,
                    quantity:quantity + 1
                }
                console.log('object: ',updatedobj)
                return   updatedobj
            }
            return obj
        })
        setCartItems(updatedItems)
        const data = localStorage.getItem('cart')
        if(data){
            const objs = JSON.parse(data)
            console.log('old list: ',objs)
            const localStorageItems = objs.map((localItem:CartObject)=>{
                if(localItem.id === item.product.id){
                    return {
                        ...localItem,
                        quantity:quantity + 1,
                        
                    
                    }
                    
                }
                return localItem
            })
            localStorage.setItem('cart',JSON.stringify(localStorageItems))
        }


    }

    const DecrementUpdate = ()=>{
        const updatedItems = cartItems.map((obj:Cartitem)=>{
            if(obj.product?.id == item.product?.id){
                const updatedobj = {
                    ...obj,
                    quantity:quantity - 1
                }
                return   updatedobj
            }
            return obj
        })
        setCartItems(updatedItems)
        const data = localStorage.getItem('cart')
        if(data){
            const objs = JSON.parse(data)
            const localStorageItems = objs.map((localItem:CartObject)=>{
                if(localItem.id === item.product.id){
                    return {
                        ...localItem,
                        quantity:quantity - 1,
                        
                    
                    }
                    
                }
                return localItem
            })
            localStorage.setItem('cart',JSON.stringify(localStorageItems))
        }


    }

    const [quantity,setQuantity] = useState<number>(item.quantity)
    const {cartItems,setCartItems} = useContext(AppContext)
    return (
        <div key={item?.product?.id} className="w-[90%] md:w-[70%] border border-gray-200 flex flex-col items-center gap-4 py-4">
            {item &&
            <div className="md:flex md:w-full md:gap-12 md:items-center md:justify-center">
                <div className="md:flex md:items-center md:w-[500px] md:gap-4">
                    <Image className="md:h-[150px] w-[150px]" src={item.product?.main_image} width={200} height={200} alt={item.product?.name} />
                    <p className="hidden md:block text-sm">{item.product?.name}</p>
                </div>
                <p>{item.product?.price} MAD</p>
                    <div className="quantity text-2xl border border-gray-300 md:h-fit ">
                        <span className="px-[12px] bg-red-500 font-bold cursor-pointer" onClick={()=>{
                            if(quantity != 1 && quantity > 1){
                                DecrementUpdate()
                                setQuantity((prev:number)=>prev - 1)
                        }
                        }}>-</span>
                        <span className="px-4">{quantity}</span>
                        <span className="px-2 bg-green-400 cursor-pointer" onClick={()=>{
                            IncrementUpdate()
                            setQuantity((prev:number)=>prev + 1)
                        }}>+</span>
                    </div>
                <p>{quantity * parseFloat(item.product?.price.toString())}.00 MAD</p>
                <IoCloseOutline className="w-6 h-8 cursor-pointer text-red-600 transition duration-200 ease-in-out hover:scale-125" />
            </div>
            }
            
        </div>
    )
}



