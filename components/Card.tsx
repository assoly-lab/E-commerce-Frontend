import Image from "next/image";
import { Category } from "@/utils/Types"
import Link from "next/link";



export default function Card({category}:{category:Category}){
    
    return (
        <>
            <Link href={`/category/${category.id}`} >
            <div className="bg-[#EBEBEB] flex p-8 mb-8 rounded-xl justify-between group overflow-hidden">
                <div className="flex flex-col md:flex-1 items-start justify-center gap-4">
                    <h2 className=" text-2xl md:text-5xl pb-4 group-hover:text-[#E73F10] cursor-pointer">{category.name}</h2>
                    <button className="relative text-white bg-[#E73F10] border border-black py-2 px-4 rounded overflow-hidden transition duration-300 before:absolute before:inset-0 before:bg-transparent before:w-0 before:h-full before:transition-all before:duration-300 hover:before:bg-amber-400 hover:before:w-full before:z-0"><span className="relative z-20">Shop Now</span></button>
                </div>
                <Image className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] md:flex-1 transition duration-1000 group-hover:scale-110" src={category.image!} width={300} height={300} alt={category.name!} />
            </div>
            </Link>
        </>
    )
}