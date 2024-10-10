import { AppContext } from "@/Contexts/AppContext";
import { Cartitem, CartObject, Product } from "@/utils/Types";
import Image from "next/image";
import { useContext } from "react";
import {motion} from "framer-motion"
import Link from "next/link";
import toast from "react-hot-toast";
import { LiaCartPlusSolid } from "react-icons/lia";
import { FaRegEye } from "react-icons/fa6";


export default function GridItem({product}:{product:Product}){
    const {setIsQuickView,setProductId,cartItems,setCartItems,setCartCount} = useContext(AppContext)
    const handleCart = (id:number)=>{
        const cart = localStorage.getItem('cart')
        if (cart){
            const data: CartObject[] = JSON.parse(cart)
            const filter = data.some((obj:CartObject)=>obj.id === id)
            console.log(filter)
            if(filter){
                return
            }
            data.push({quantity:1,id:id})
            localStorage.setItem('cart',JSON.stringify(data))
        }else{
            localStorage.setItem('cart',JSON.stringify([{quantity:1,id:id}]))
        }
    }

    return (<>
            {product && 
                    <div key={product.id} className="mb-6 md:mr-2 md:ml-2">
                    <div className="relative bg-white rounded-xl py-4 px-2 md:py-4 md:pl-4 flex group" >
                        <Image className="rounded-lg transition duration-500 w-full h-full ease-in-out group-hover:opacity-0 z-10 md:my-0 md:mx-auto" src={`http://localhost:8000${product.main_image}`} width={220} height={220} alt={product.name} />
                        <Image className="rounded-lg absolute opacity-0 top-0 w-full h-full left-0  z-10 md:my-0  transition duration-300 ease-in-out group-hover:opacity-100" src={product.images!.length > 0  ? `http://localhost:8000${product.images![0].image}` : `http://localhost:8000${product.main_image}` } width={220} height={220} alt={product.name} />
                    
                            <motion.div className="absolute inset-0 flex flex-col justify-end items-center bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
                                    initial={{ y: 30, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                            >
                                <Link className="absolute top-0 left-0 w-[90%] mx-auto h-full z-40" href={`/product/${product.id}`}></Link>
                                <div className="relative space-x-4 z-50">
                                    <button onClick={(e)=>{
                                        e.stopPropagation()
                                        setIsQuickView(true)
                                        setProductId(product.id)
                                }} className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors z-50"><FaRegEye className="w-[26px] h-[26px]" /></button>
                                    <button onClick={(e)=>{
                                        e.stopPropagation()
                                        handleCart(product.id)
                                        if(cartItems.find((item:Cartitem)=>item.product?.id == product.id)){
                                            toast.error('Item already added to cart!')
                                            return
                                        }
                                        setCartItems((prev:Product[] | [])=>[...prev,{quantity:1,product:product}])
                                        setCartCount((prev:number)=>prev + 1)
                                        toast.success('Item added to cart!')
                                    }} className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors z-50"> <LiaCartPlusSolid className="w-[26px] h-[26px]" /></button>
                                    
                                </div>
                            </motion.div>    
                    </div>
                    <Link className="z-20" href={`http://localhost:3000/product/${product.id}`}>
                    <h2 className="md:text-xl mt-2 hover:text-[#E73F10] cursor-pointer line-clamp-1 text-center mx-auto">{product.name}</h2>
                    <p className="text-base mt-2 text-white font-semibold  bg-[#E73F10] px-2 rounded-lg w-fit mx-auto">{product.price} MAD</p>
                    </Link>
                   </div>
            }
            
            </>
    )
}