'use client'

import { AnimatePresence,motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";

type LinksTypes  = 'quick links'|'infos'|'policies'|undefined

export default function MobileFooterLinks(){
    const [links,setLinks] = useState<LinksTypes>()
    return(
        <div className="links  pb-8 flex flex-col gap-6 md:aria-hidden md:hidden">
                    <div onClick={()=>setLinks((prev:LinksTypes)=>{
                        if(prev !== 'quick links') return 'quick links'
                        else return undefined
                    })} className="quick-links flex justify-between text-xl cursor-pointer group">
                        <p  className="hover:text-[#E73F10] cursor-pointer group-hover:text-[#E73F10] font-semibold">Quick Links</p>
                        <IoMdArrowDropdown className="mt-2 group-hover:text-[#E73F10]" />
                    </div>
                    <AnimatePresence>
                        {links == 'quick links' &&
                        <motion.div
                        className="flex flex-col gap-2"
                        initial={{height:0,opacity:0}}
                        animate={{height:'auto',opacity:1}}
                        exit={{height:0,opacity:0}}
                        >
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/profile'} >My account</Link>
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/cart'} >My cart</Link>
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >Need help?</Link>
                        </motion.div> 
                        }
                    </AnimatePresence>
                    <div onClick={()=>setLinks((prev:LinksTypes)=>{
                        if(prev !== 'infos') return 'infos'
                        else return undefined
                    })} className="informations flex justify-between text-xl group">
                        <p  className="hover:text-[#E73F10] cursor-pointer group-hover:text-[#E73F10] font-semibold">Informations</p>
                        <IoMdArrowDropdown className="mt-2 group-hover:text-[#E73F10]"/>
                    </div>
                    <AnimatePresence>
                        {links == 'infos' &&
                        <motion.div
                        className="flex flex-col gap-2"
                        initial={{height:0,opacity:0}}
                        animate={{height:'auto',opacity:1}}
                        exit={{height:0,opacity:0}}
                        >
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >About us</Link>
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >Contact us</Link>
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >FAQ</Link>
                        </motion.div> 
                        }
                    </AnimatePresence>
                    <div onClick={()=>setLinks((prev:LinksTypes)=>{
                        if(prev !== 'policies') return 'policies'
                        else return undefined
                    })} className="policies flex justify-between text-xl group">
                        <p  className="hover:text-[#E73F10] cursor-pointer group-hover:text-[#E73F10] font-semibold">Policies</p>
                        <IoMdArrowDropdown className="mt-2 group-hover:text-[#E73F10]"/>
                    </div>
                    <AnimatePresence>
                        {links == 'policies' &&
                        <motion.div
                        className="flex flex-col gap-2"
                        initial={{height:0,opacity:0}}
                        animate={{height:'auto',opacity:1}}
                        exit={{height:0,opacity:0}}
                        >
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >Privacy policy</Link>
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >Refund policy</Link>
                            <Link className="hover:text-[#E73F10] text-lg font-medium" href={'/'} >Terms of service</Link>
                        </motion.div> 
                        }
                    </AnimatePresence>
                </div>
    )
}