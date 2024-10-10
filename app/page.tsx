import BestSelling from "@/components/BestSelling";
import CategoryShowcase from "@/components/CategoriesShowcase";
import BestOffers from "@/components/BestOffers";
import AnimatedSlider from "@/components/Slider";
import { jost } from "@/utils/Fonts"
import FeaturedSlider from "@/components/FeaturedSlider";
import NewArrivalSlider from "@/components/NewArrivalSlider";
import SlidingText from "@/components/SlidingText";
import Link from "next/link";




const getFeaturedProducts = async ()=>{
  const response = await fetch('http://localhost:8000/api/best-selling/')
  const data = await response.json()
  return data
}


const getNewArrivalProducts = async ()=>{
  const response = await fetch('http://localhost:8000/api/new-arrival/')
  const data = await response.json()
  return data
}

export default async function Home() {

  const FeaturedItems = await getFeaturedProducts()
  const NewArrivalItems = await getNewArrivalProducts()

  return (
    <div className={jost.className} >
          <div className=" flex md:w-full md:flex justify-center">
            <AnimatedSlider  />
          </div>
          <div className="w-full flex justify-center">
            <CategoryShowcase />
          </div>
          <div>
            <div className="w-full flex flex-col justify-center items-center mb-16 mt-20">
          {/* @ts-expect-error Server Component */}
              <BestSelling />
            </div>
          </div>
          <div className="w-full bg-[#EBEBEB] md:h-[600px] flex items-center justify-center mb-8">
            <BestOffers />

          </div>
          <div className="w-full flex flex-col mb-20">
            <h2 className="text-2xl text-center font-medium mb-4">Featured Products</h2>
            <FeaturedSlider items={FeaturedItems} />
            <Link href={'/products'}>
              <button
                  className="relative mx-auto w-30 z-10 mt-8 md:mt-20 px-6 py-2 bg-[#E73F10] text-white text-lg rounded overflow-hidden transition duration-300 hover:text-white before:absolute before:inset-0 before:bg-amber-400 before:w-0 before:h-full before:transition-all before:duration-300 hover:before:w-full before:z-0"
                  >
                  <span className="relative z-20">View All</span>
              </button>
            </Link>
          </div>
          <div className="w-full flex flex-col mb-12">
            <h2 className="text-2xl text-center font-medium mb-4">New Arrivals</h2>
            <NewArrivalSlider items={NewArrivalItems} />
            <Link href={'/products'} >
              <button
                  className="relative mx-auto w-30 z-10 mt-8 md:mt-20 px-6 py-2 bg-[#E73F10] text-white text-lg rounded overflow-hidden transition duration-300 hover:text-white before:absolute before:inset-0 before:bg-amber-400 before:w-0 before:h-full before:transition-all before:duration-300 hover:before:w-full before:z-0"
                  >
                  <span className="relative z-20">View All</span>
              </button>
            </Link>
          </div>
          <div className="mb-8">
            <SlidingText />
          </div>
          
   </div>
  );
}