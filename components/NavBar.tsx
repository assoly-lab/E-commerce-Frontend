'use client'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { GrCart } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";

import Sidebar from "./Sidebar";
import { useContext, useEffect } from "react";
import { AppContext } from "@/Contexts/AppContext";
import FlyOut from "./FlyOut";
import DesktopNav from "./Navigation/DesktopCategories";
import ProductsNav from "./Navigation/DesktopProducts";
import QuickView from "./QuickView";
import Cart from "./Cart";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";






export default function Navbar(){
    const {isSidebar,setIsSidebar,isQuickView,isCart,setIsCart,cartCount,setCartCount} = useContext(AppContext)
    // const access = localStorage.getItem('access')
    useEffect(()=>{
      const data = localStorage.getItem('cart')
      if(data){
        const ids = JSON.parse(data)
        setCartCount(ids.length)
      }
    },[])

    return  (
    <div className=" w-full flex justify-center pb-4">
      {isQuickView && <QuickView /> }
    {/* mobile navbar */}
      <AnimatePresence>
        {isSidebar && <Sidebar />}
      </AnimatePresence>
      <AnimatePresence>
        {isCart && <Cart />}
      </AnimatePresence>
        <div className="flex w-full justify-between items-center md:w-[80%] pt-4 mx-4 md:h-20 md:flex md:justify-between">
            <div className="md:hidden" aria-hidden onClick={()=>{
                    setIsSidebar(!isSidebar)
                }}>
                <RxHamburgerMenu className="w-[30px] h-[30px] cursor-pointer hover:text-[#E73F10] md:hidden" />
            </div>


            <div>
                <Link href={'/'}><h1 className="text-2xl uppercase">E- <span className="text-[#E73F10]">Store</span></h1></Link>
            </div>
            {/* desktop Nav */}
            <div className="desktop-nav hidden md:block">
                <ul className="flex gap-6 text-xl">
                    <FlyOut FlyoutContent width="1336" >
                        <Link href={'/'}><li className="md:relative md:flex md:gap-2 hover:text-[#E73F10] hover:cursor-pointer">Home</li></Link>
                    </FlyOut>
                    <FlyOut FlyoutContent={<DesktopNav />} width="1200">
                        <li className=" md:flex md:gap-2 group-hover:text-[#E73F10] focus:text-[#E73F10] hover:cursor-pointer">Categories<IoMdArrowDropdown className="w-[15px] h-[15px] mt-[10px]" /></li>
                    </FlyOut>
                    <FlyOut FlyoutContent={<ProductsNav />} width="1336" >
                        <li className="md:flex md:gap-2 hover:text-[#E73F10] hover:cursor-pointer">Products<IoMdArrowDropdown className="w-[15px] h-[15px] mt-[10px]" /></li>
                    </FlyOut>
                    <FlyOut FlyoutContent width="150" >
                        <li className="md:flex md:gap-2 hover:text-[#E73F10] hover:cursor-pointer">Pages<IoMdArrowDropdown className="w-[15px] h-[15px] mt-[10px]" /></li>
                    </FlyOut>
                </ul>
            </div>
            {/* end of desktop nav */}
            <div className="flex mr-1 ">
                <IoSearch className="w-[25px] h-[25px] cursor-pointer hover:text-[#E73F10]" />
                <Link href={'/profile'}><FaRegUser className="w-[25px] h-[20px] ml-4 mt-[2px] cursor-pointer hover:text-[#E73F10]" /></Link>
                <div onClick={()=>setIsCart(true)}  className=" relative cursor-pointer hover:text-[#E73F10]">
                    <GrCart className="w-[25px] h-[20px] ml-4 mt-[2px] " />
                    <span className=" absolute text-sm -top-1 -right-3 cursor-pointer text-white bg-[#E73F10] px-1.5 rounded-full font-semibold">{cartCount}</span>
                </div>
            </div>
        </div>
    </div>

    )
}



const someContent = () => {
    return (
      <div className="w-64 bg-white p-6 shadow-xl">
        <div className="mb-3 space-y-3">
          <h3 className="font-semibold">For Individuals</h3>
          <a href="#" className="block text-sm hover:underline">
            Introduction
          </a>
          <a href="#" className="block text-sm hover:underline">
            Pay as you go
          </a>
        </div>
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold">For Companies</h3>
          <a href="#" className="block text-sm hover:underline">
            Startups
          </a>
          <a href="#" className="block text-sm hover:underline">
            SMBs
          </a>
          <a href="#" className="block text-sm hover:underline">
            Enterprise
          </a>
        </div>
        <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
          Contact sales
        </button>
      </div>
    );
  };