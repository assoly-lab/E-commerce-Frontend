import Countdown from "./Countdown";



export default function BestOffers(){
    const targetDate = '2024-12-31T00:00:00';
    return (
        <div className="flex md:gap-8 gap-6 flex-col py-[100px] justify-center  items-center">
            <h3 className="md:text-5xl text-3xl text-black">Best Offers - Up to <span className="text-[#E73F10]">50%</span></h3>
            <p className="">Explore our latest New Arrivals & unlock discounts of up to 50% off!</p>
            <Countdown targetDate={targetDate}  />
            <button
                className="relative z-10 md:mt-20 px-6 py-2 bg-[#E73F10] text-white text-lg rounded overflow-hidden transition duration-300 hover:text-white before:absolute before:inset-0 before:bg-amber-400 before:w-0 before:h-full before:transition-all before:duration-300 hover:before:w-full before:z-0"
                >
                <span className="relative z-20">View All</span>
            </button>
        </div>
    )
}