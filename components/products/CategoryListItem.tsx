import { CategoryCountsList } from "@/utils/Types"
import Image from "next/image"
import Link from "next/link"



export default function CategoryListItem({category}:{category:CategoryCountsList}){

    return (
        <div className="bg-gray-100 flex flex-col md:flex-row gap-8 p-8 w-full md:h-[300px] rounded-lg" >
        <div className="relative md:w-[30%] md:h-[260px] group bg-white rounded-lg" >
            <Link className="absolute h-full w-full top-0 left-0 z-40" href={`http://localhost:3000/category/${category.id}`}></Link>
            <Image className="rounded-lg w-full h-full transition duration-300" src={category.image!} width={260} height={260} alt={category.description!} />
        </div>

        <div className="infos md:w-[70%] flex flex-col gap-4">
            <Link href={`http://localhost:3000/category/${category.id}`} className="text-xl md:text-2xl font-semibold hover:text-[#E73F10] cursor-pointer line-clamp-1 ">{category.name}</Link>
            <p className="line-clamp-4 text-base font-medium">{category.description}</p>
        </div>
        </div>
    )
}