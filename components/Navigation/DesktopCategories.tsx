'use client'

import { AppContext } from "@/Contexts/AppContext"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Category } from "@/utils/Types"








export default function DesktopNav(){
    const {categories,setCategories} = useContext(AppContext)
    const [isLoading,setIsLoading] = useState<Boolean>(false)
    const getCategories = async ()=>{
        if(categories == undefined){
            setIsLoading(true)
        try{
            const response = await fetch('http://localhost:8000/api/categories/')
            if(response.ok){
                const data = await response.json()
                setCategories(data)
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
        
    }

    }
    useEffect(()=>{
        getCategories()
    },[])

    return (
        <div className="grid grid-cols-4 gap-5 justify-items-center">
            {isLoading &&
            <div>
                Loading...
            </div>
            }
        {
            categories &&
            categories.map((category:Category)=>{
                return (
                    <Link key={category.id} href={`/category/${category.id}`}>
                        <div  className=" group cursor-pointer hover:text-[#E73F10]">
                            <>
                                <p className="py-4 border-b">{category.name}</p>
                                <Image className="my-8 p-4 rounded-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 ease-out" src={category.image!} alt={category.name! } width={245} height={245} />
                            </>
                        </div>
                    </Link>
                )
            })
        }
        </div>
    )
}