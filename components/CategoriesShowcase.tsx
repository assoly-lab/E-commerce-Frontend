'use client'
import { AppContext } from "@/Contexts/AppContext"
import { useContext, useEffect, useState } from "react"
import Card from "./Card"
import { Category } from "@/utils/Types"


export default function CategoryShowcase(){

    const {categories,setCategories} = useContext(AppContext)
    const [isLoading,setIsLoading] = useState(false)

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
        <div className=" w-[90%] mt-24 md:w-[80%]">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center">
                {categories && categories.slice(5).map((category:Category)=>{
                    return(
                    <Card key={category.id} category={category} />
                    )

                })}
            </div>
        </div>
    )
}