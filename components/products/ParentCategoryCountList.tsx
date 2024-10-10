import { CategoryCountsList } from "@/utils/Types";
import Link from "next/link";


export default function ParentCategoryCountList({categoryCounts}:{categoryCounts:CategoryCountsList[]}){
    return (
        <>
        {
            categoryCounts.map((categoryCount:CategoryCountsList)=>{
                return (
                    <div key={categoryCount.id} className="flex gap-8" >
                        <Link  href={`http://localhost:3000/category/${categoryCount.id}`} className="hover:text-[#E73F10]" ><p className="text-lg font-medium">{categoryCount.name}</p></Link>
                        <p className="text-gray-400">({categoryCount.product_count})</p>
                    </div>
                )
            })
        }
        
        </>
    )
}