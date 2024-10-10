'use client'

import { FaCcMastercard } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Contexts/AppContext";
import { Cartitem } from "@/utils/Types";
import Image from "next/image";
import {motion,AnimatePresence} from "framer-motion"
import OrderSummary from "./OrderSummary";
import Link from "next/link";

export default function PaymentForm(){
    const {subTotal,cartItems,} = useContext(AppContext)
    const [isSummary,setIsSummary] = useState<Boolean>(false)
    const [itemsNumber,setItemsNumber] = useState<number>(0)
    useEffect(()=>{
        if(cartItems){const items = cartItems.reduce((acc:number,item:Cartitem)=>{
            return acc + item.quantity 
            
        },0)
        setItemsNumber(items)
    }
    },[cartItems])
    return (
        <div className="mx-4 mt-8 md:flex md:mt-0 md:mx-0 md:border-t md:border-gray-300">
            <div className="md:hidden">
                <OrderSummary />
            </div>
            <form className="md:flex-1 flex justify-end">
                <div className="md:w-[75%] md:mr-8 md:mt-4">
                <div className="email flex justify-between">
                    <label htmlFor="email" className="text-2xl font-medium cursor-pointer">Contact</label>
                    <Link href={'/login'} className="underline">Login</Link>
                </div>
                <input id="email" type="text" placeholder="Email" required value={''} className="mt-4 border-2 border-gray-200 focus:border-black focus:outline-none w-full py-2 pl-2 rounded-md" />
                <div className="newsletter flex gap-2 items-center mt-1">
                    <input type="checkbox" name="newsletter" id="newsletter" className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <span>Email me with news and offers</span>
                </div>
                <div className="delivery flex justify-between mt-16 mb-4">
                    <p className="text-2xl font-medium">Delivery</p>
                </div>
                <div className="delivery">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-600 w-full">Country</label>
                    <select id="countries" className=" border border-gray-300 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none bg-white cursor-pointer [&>*]:cursor-pointer">
                        <option selected>Morocco</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                    <input type="text" placeholder="First name (optional)" value='' className="mt-4 border-2 border-gray-200 focus:border-black focus:outline-none w-full py-2 pl-2 rounded-md" />
                    <input type="text" placeholder="Last name" value='' className="mt-4 border-2 border-gray-200 focus:border-black focus:outline-none w-full py-2 pl-2 rounded-md" />
                    <input type="text" placeholder="Address" value='' className="mt-4 border-2 border-gray-200 focus:border-black focus:outline-none w-full py-2 pl-2 rounded-md" />
                    <input type="text" placeholder="Postal code (optional)" value='' className="mt-4 border-2 border-gray-200 focus:border-black focus:outline-none w-full py-2 pl-2 rounded-md" />
                    <input type="text" placeholder="City" value='' className="mt-4 border-2 border-gray-200 focus:border-black focus:outline-none w-full py-2 pl-2 rounded-md" />
                    <div className="info-save flex gap-2 items-center mt-1">
                    <input type="checkbox" name="newsletter" id="newsletter" className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <span>Save this information for next time</span>
                </div>
                </div>
                <div className="payment-info mt-8">
                    <p className="text-2xl font medium">Payment</p>
                    <span className="text-sm text-gray-500">All transactions are secure and encrypted.</span>
                    <div className="bg-gray-200 py-4 flex justify-between px-4 items-center rounded-t-md border border-black">
                        <div className="credit-card flex items-center gap-4 ">
                            <input type="radio" name="credit-card" className="w-4 h-4 p-1" defaultChecked  />
                            <span className="mb-1">Credit Card</span>
                        </div>
                        <FaCcMastercard className="w-8 h-8"/>
                    </div>
                    <div className="bg-gray-200 flex flex-col items-center gap-4 border-t-black py-4">
                        <div className="relative secure w-[90%]">
                            <input className="w-full px-4 py-2 placeholder-gray-500 border border-gray-400 rounded-sm focus:border-black focus:outline-none" type="text" name="card-number" placeholder="Credit card number" value={''} />
                            <CiLock className="w-6 h-6 absolute right-4 top-2 text-gray-500 " />
                        </div>
                        <input className="w-[90%] placeholder-gray-500 px-4 py-2 rounded-sm border border-gray-400 focus:border-black focus:outline-none" type="text" name="expiration-date" value={''} placeholder="Expiration date (MM / YY)" />
                        <input className="w-[90%] placeholder-gray-500 px-4 py-2 rounded-sm border border-gray-400 focus:border-black focus:outline-none" type="text" name="security-code" value={''} placeholder="Security code" />
                        <input className="w-[90%] placeholder-gray-500 px-4 py-2 rounded-sm border border-gray-400 focus:border-black focus:outline-none" type="text" name="card-name" value={''} placeholder="Name on card" />
                        <div className="w-[90%] flex items-center gap-4">
                            <input type="checkbox" name="billing-address" id="address" className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked/>
                            <span>Use billing address as shipping address</span>
                        </div>
                    </div>
                </div>

            <div className="flex justify-between items-center mt-4 md:hidden">
                <p className="text-2xl font-medium" >Order summary</p>
                <span onClick={()=>setIsSummary(!isSummary)} className="flex gap-2 cursor-pointer"><span>Show</span> <IoIosArrowDown className="mt-2" /></span>
            </div>
            <AnimatePresence>
                {isSummary && 
                <motion.div className=" md:hidden py-4 mt-4 border-b flex flex-col gap-2 border-gray-200 bg-gray-100"
                initial={{ opacity: 0, y: -30 }} // Start above the viewport
                animate={{ opacity: 1, y: 0 }}    // Slide down into view
                exit={{ opacity: 0, y: -100 }}     // Slide back up when exiting
                transition={{ duration: 0.3 }}
                >
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
                </motion.div>
                }
            </AnimatePresence>
            <div className="payment-info flex flex-col gap-2 mt-8 pb-8  md:hidden">
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
            <button type="submit" className="bg-[#e26643] hover:bg-[#E73F10] text-xl font-semibold text-white w-full py-2 rounded-md md:mt-4 md:py-4">Pay now</button>
            </div>
        </form>
        <div className=" hidden md:block md:flex-1 bg-[#EBEBEB50] border-l border-gray-200">
            <div className=" border-b border-gray-200 w-[60%] md:mt-4 md:ml-8">
                {cartItems &&
                cartItems.map((item:Cartitem)=>{
                    return (
                        <div key={item.product.id} className="relative flex justify-between gap-8">
                            <span className="absolute left-16 top-0.5 bg-[#E73F10] px-2 rounded-full text-white font-medium">{item.quantity}</span>
                            <div className="flex-2 infos flex items-center gap-4">
                                <Image src={item.product.main_image} width={80} height={80} alt={item.product.name} />
                                <p className="text-xs">{item.product.name}</p>
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
            </div>
            </div>
        </div>
    )
}





