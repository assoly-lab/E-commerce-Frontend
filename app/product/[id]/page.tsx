

import AddToCart from "@/components/AddToCart"
import Views from "@/components/Views"
import { Category, Product } from "@/utils/Types"
import ProductSlider from "@/components/ProductSlider"
import { FaAmazonPay, FaApplePay, FaBitcoin, FaGooglePay, FaPaypal, FaCcVisa } from "react-icons/fa6"
import { FaFacebookF,FaInstagram  } from "react-icons/fa";
import { FaXTwitter, FaPinterest } from "react-icons/fa6";
import Review from "@/components/Review"
import FeaturedSlider from "@/components/FeaturedSlider"
import ListReviews from "@/components/ListReviews"
import FaqAccordion from "@/components/FaqAccordion"



const getFeaturedProducts = async ()=>{
    try{
    const response = await fetch('http://localhost:8000/api/best-selling/')
    if(response.ok){
        const data = await response.json()
        return data
    }
    }catch(error){
        console.log(error)
    }
  }



const getProductReviewsSummary = async (id:string)=>{
    if(id){
        try{
            const response = await fetch(`http://localhost:8000/api/productreviewsummary/${id}/`,{cache:'no-store'})
            if(response.ok){
                const data = await response.json()
                return data
            }
        }catch(error){
            console.log(error)
        }
    }
}

const getProductDetails = async (id:string)=>{
    if(id){
        try{
            const response = await fetch(`http://localhost:8000/api/product/${id}/`,{cache:'no-store'})
            if(response.ok){
                const data = await response.json()
                const product = data[0]
                if(product){
                    const category = await getCategory(data[0].category)
                    return {product:product as Product,
                    category:category[0] as Category}
                }
            }
        }catch(error){
            console.log(error)
        }
    }
    return {
        product: undefined, category: undefined
    }
}


const getCategory = async (id:number)=>{
    if(id){
        try{
            const response = await fetch(`http://localhost:8000/api/category/${id}`)
            if (response.ok){
                const data = await response.json()
                return data
                
            }
        }catch(error){
            console.log(error)
        }
    }
}


export default async function ProductPage({params}:{params: { id: string }}){
    const {product,category} = await getProductDetails(params.id)
    const featuredItems = await getFeaturedProducts()
    return (
        <>
            <div className="md:flex gap-4 ">
                {product && 
                <>
                    <div className="flex-1 mb-20 md:mb-0">
                        <ProductSlider product={product} />
                    </div>
                    <div className="pl-4 flex-1">
                        <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
                            <p className="text-xl font-semibold">{product.name}</p>
                            <p className="text-2xl font-semibold">{product.price} MAD</p>
                        </div>
                        <div className="py-6 border-b border-gray-200 pr-2">
                            <p>{product.description}</p>
                        </div>
                        <div className="views">
                            <Views />
                        </div>
                        <div className="py-4 flex flex-col gap-2 border-b border-b-gray-200 ">
                            <div className="availability w-52 flex gap-4">
                                <p className="font-semibold flex-1">Availability:</p>
                                <p className="flex-1 text-[#E73F10]">{product.stock} left in stock</p>
                            </div>
                            <div className="sku w-52 flex gap-4">
                                <p className="font-semibold flex-1">SKU:</p>
                                <p className="flex-1">{product.id}</p>
                            </div>
                            <div className="type w-52 flex gap-4">
                                <p className="font-semibold flex-1">Type:</p>
                                <p className="flex-1">{category && category.name }</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 justify-center items-center mt-4 pb-6 border-b border-b-gray-200 ">
                            <div className="flex gap-4 items-center">
                                <AddToCart item={product} />
                            </div>
                            <button className="text-white bg-blue-500  w-60 py-2 font-semibold rounded-md">Buy it now</button>
                        </div>
                        <div className="mt-4 border-b border-b-gray-200">
                            <h3 className="text-base font-semibold mb-2">Guaranteed safe checkout</h3>
                            <div className="safe-checkout flex gap-2 [&>*]:hover:cursor-pointer mb-8">
                                <FaGooglePay className="h-8 w-12 bg-gray-200 px-1 py-1 rounded-md  hover:text-[#f98463]" />
                                <FaApplePay className="h-8 w-12 bg-gray-200 px-1 py-1 rounded-md hover:text-[#f98463]"  />
                                <FaAmazonPay className="h-8 w-12 bg-gray-200 px-1 py-1 rounded-md hover:text-[#f98463]"  />
                                <FaBitcoin className="h-8 w-12 bg-gray-200 px-1 py-1 rounded-md hover:text-[#f98463]"  />
                                <FaPaypal className="h-8 w-12 bg-gray-200 px-1 py-1 rounded-md hover:text-[#f98463]"  />
                                <FaCcVisa className="h-8 w-12 bg-gray-200 px-1 py-1 rounded-md hover:text-[#f98463]"  />
                            </div>
                        </div>
                        <div className="py-4">
                            <p>Estimated Delivery Date :</p>
                        </div>
                        <div className="pb-4 border-b border-b-gray-200">
                            <p className="text-sm font-semibold">Return rules summary:</p>
                            <ul className="list-disc ml-4">
                                <li className="">Returns accepted for 30 days</li>
                                <li className="">Free return shipping</li>
                                <li className="">No restocking fee</li>
                                <li className="">No final sale items</li>
                            </ul>
                        </div>
                        <div className=" py-4 flex gap-6 border-b border-b-gray-200 text-sm">
                            <p>Share:</p>
                            <div className="flex gap-2 cursor-pointer hover:text-[#E73F10]"><FaFacebookF className="mt-[2px]"/> <span>Facebook</span></div>
                            <div className="flex gap-2 cursor-pointer hover:text-[#E73F10]"><FaXTwitter className="mt-[3px]" /> <span>X</span></div>
                            <div className="flex gap-2 cursor-pointer hover:text-[#E73F10]"><FaInstagram className="mt-[3px]"/> <span>Instagram</span></div>

                            <div className="flex gap-2 cursor-pointer hover:text-[#E73F10]"><FaPinterest className="mt-[3px]"/> <span>Pinterest</span></div>
                        </div>
                    </div>
                </>
                }

            </div>
            <div className="flex justify-center pb-16 border-b border-b-gray-200">
                <Review />
            </div>
            <div className="mt-16 md:mb-32 md:flex md:justify-center">
                {/* @ts-expect-error Server Component */}
                <ListReviews id={product?.id} />
            </div>
            <div className="flex flex-col items-center mt-12">
                <p className="mb-4 text-2xl font-semibold">Featured Products</p>
                <FeaturedSlider items={featuredItems} />
            </div>
            <div className="w-full flex justify-center mt-20">
                <FaqAccordion />
            </div>
            
        </>
    )
}