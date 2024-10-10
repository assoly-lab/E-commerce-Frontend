import { CategoryCountsList } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";



export default function CategoryGridItem({category}:{category:CategoryCountsList}){

    return (
        <div key={category.id} className="mb-6 md:mr-2 md:ml-2">
                    <div className="relative bg-white rounded-xl py-4 px-2 md:py-4 md:pl-4 flex group" >
                    <Link className="z-20" href={`http://localhost:3000/category/${category.id}`}>
                        <Image className="rounded-lg transition duration-500 w-full h-full ease-in-out z-10 md:my-0 md:mx-auto" src={category.image!} width={220} height={220} alt={category.description!} />
                    </Link>
                    </div>
                    <Link className="z-20" href={`http://localhost:3000/category/${category.id}`}>
                    <h2 className="md:text-xl mt-2 hover:text-[#E73F10] cursor-pointer line-clamp-1 text-center mx-auto">{category.name}</h2>
                    </Link>
                   </div>
    )
}