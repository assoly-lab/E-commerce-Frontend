import { AppContext } from "@/Contexts/AppContext"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Category } from "@/utils/Types"



export default function ProductsNav(){
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
        console.log(categories)
    }
    useEffect(()=>{
        getCategories()
    },[])


    return (
        <div className="w-fit h-fit grid grid-cols-6 gap-4 pl-8">
            {categories && categories.map((category:Category)=>{
                return ( 
                    <>
                    { category.children && 
                        <div key={category.id} className="main-cat pb-4 flex flex-col whitespace-nowrap group pt-4"><p className="pb-4 text-xl group-hover:text-[#E73F10]" >{category.name }</p>
                        { category.children && category.children.map((child:Category)=>{
                            return (
                                <Link href={`/category/${child.id}`}>
                                <p key={child.id} className="text-base pb-4 hover:text-[#E73F10] cursor-pointer" >
                                     {child.name}
                                </p>
                                </Link>
                            )
                        })

                        }
                    </div>

                    }
                    </>
                )
            })

            }

        </div>
    )






}
