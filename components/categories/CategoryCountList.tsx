import { CategoryCountsList } from "@/utils/Types";
import Link from "next/link";


export default function CategoryCountList({categoryCounts,param}:{categoryCounts:CategoryCountsList[],param:string}){
    return (
        <>
        {
            categoryCounts.map((categoryCount:CategoryCountsList)=>{
                return (
                    <div key={categoryCount.id} className="flex gap-8" >
                        <Link style={{color:categoryCount.id == Number(param) ? '#E73F10' : 'black'}} href={`http://localhost:3000/category/${categoryCount.id}`} className="hover:!text-[#E73F10]" ><p className="text-lg font-medium">{categoryCount.name}</p></Link>
                        <p className="text-gray-400">({categoryCount.product_count})</p>
                    </div>
                )
            })
        }
        
        </>
    )
}