import Link from "next/link"
import BestSellingItem from "./BestSellingItem"


const getBestSellingProducts = async ()=>{
    const response = await fetch('http://localhost:8000/api/best-selling/')
    const data = await response.json()
    return data
}

export default async function BestSelling(){
    const bestSellingItems = await getBestSellingProducts()
    return (
        <>
            <h2 className="text-4xl mb-4">Best Selling</h2>
            <div className="bg-[#EBEBEB] w-[90%] rounded-xl md:p-4 mb-4">
                <BestSellingItem items={bestSellingItems} />
            </div>
            <Link href={'/products'} >
                <button
                    className="relative z-10 mt-8 md:mt-20 px-6 py-2 bg-[#E73F10] text-white text-lg rounded overflow-hidden transition duration-300 hover:text-white before:absolute before:inset-0 before:bg-amber-400 before:w-0 before:h-full before:transition-all before:duration-300 hover:before:w-full before:z-0"
                    >
                    <span className="relative z-20">View All</span>
                </button>
            </Link>
        </>
    ) 
}