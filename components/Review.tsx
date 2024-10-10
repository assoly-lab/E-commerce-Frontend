'use client'

import { ReviewsByRating, ReviewSummary, section } from "@/utils/Types";
import { useContext, useEffect, useState } from "react"
import { RiStarSFill } from "react-icons/ri";
import WriteReview from "./WriteReview";
import { AnimatePresence } from "framer-motion"
import { useParams } from "next/navigation";
import { AppContext } from "@/Contexts/AppContext";



export default function Review(){
    const [ section,setSection ] = useState<section>('review')
    const [ writeReview,setWriteReview ] = useState<Boolean>(false)
    const [ reviewSummary,setReviewSummary ] = useState<ReviewSummary>()
    const {id} = useParams<{id:string}>()
    const {reviewsList} = useContext(AppContext)


    useEffect(()=>{
        const getProductReviewsSummary = async (id:string)=>{
            if(id){
                try{
                    const response = await fetch(`http://localhost:8000/api/productreviewsummary/${id}/`,{cache:'no-store'})
                    if(response.ok){
                        const data = await response.json()
                        if(data){
                            setReviewSummary(data)
                        }
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
        getProductReviewsSummary(id)
    },[reviewsList])

    return (
        <div className="w-full md:w-[80%]" >
            <div className="flex gap-8 py-4 mx-4 border-b border-b-gray-200">
                <p 
                    onClick={()=>setSection('review')}
                    style={{
                        color: section == 'review' ? "#e76642" : "black"
                        }} className="relative cursor-pointer font-semibold">
                            Reviews 
                    <span
                        style={{
                        transform: section == 'review' ? "scaleX(1)" : "scaleX(0)",
                        color: section == 'review' ? "#e76642" : "black"
                        }}
                        className='absolute -bottom-4 left-0 right-0  h-1 origin-left scale-x-0 rounded-full bg-[#e76642] transition-transform duration-300 ease-out' 
                    />

                </p>
                
                <p 
                style={{
                    color: section == "shipping" ? "#e76642" : "black"
                    }}
                className="relative cursor-pointer font-semibold" onClick={()=>setSection('shipping')}>Shipping Policy
                    <span
                        style={{
                        transform: section == "shipping" ? "scaleX(1)" : "scaleX(0)",
                        }}
                        className='absolute -bottom-4 left-0 right-0  h-1 origin-left scale-x-0 rounded-full bg-[#e76642] transition-transform duration-300 ease-out' 
                    />
                </p>
            </div>
            
            { section == 'review' ? 
            <div className="flex flex-col items-center gap-2 mt-6">
                <p className="text-xl font-semibold">Customers Reviews</p>
                {reviewSummary && <RatingStats reviewSummary={reviewSummary} />}
                <button className="mt-4 p-2 text-2xl font-semibold text-white bg-[#e76642] hover:bg-[#E73F10] rounded-md w-[250px]"
                onClick={()=>setWriteReview(!writeReview)}
                >{ writeReview ? 'Cancel' : 'Write a review'}</button>
                <AnimatePresence>
                {writeReview && 
                <WriteReview setWriteReview={setWriteReview} />
                }
                </AnimatePresence>
            </div> :
                <div>
                    {<ShippingPolicy />}
                </div>
            }
        </div>
    )
}



const RatingStats = ({ reviewSummary }: { reviewSummary: ReviewSummary }) => {
    const { number_of_reviews, reviews_by_rating } = reviewSummary;
    const totalReviews = (Object.keys(reviews_by_rating) as (keyof ReviewsByRating)[]).reduce((acc, rating) => {
        return acc + Number(rating) * reviews_by_rating[rating];
    }, 0);
        
    const averageRating = totalReviews != 0 && number_of_reviews !=0 ? totalReviews / number_of_reviews : 0;
    console.log('average: ', averageRating)
    
    const barWidths = (Object.keys(reviews_by_rating) as (keyof ReviewsByRating)[]).map(rating => {
        const count = reviews_by_rating[rating];
        return count == 0 || number_of_reviews == 0 ? 0 : (count / number_of_reviews) * 100 
    });
    return (
        <>
            <div className="flex gap-1 items-center">
                {Array.from({ length: 5 }).map((_, index: number) => (
                    <RiStarSFill key={index} className="w-5 h-5 mt-1" fill={index + 1 <= (number_of_reviews == 0 ? 0 : Math.floor(averageRating + 0.4999) ) ? 'gold' : 'gray'} />
                ))}
                <span>{ averageRating != 0 ? Math.floor(averageRating + 0.4999) : averageRating } out of 5</span>
            </div>
            <p>Based on {number_of_reviews} review</p>
            <div className="flex flex-col justify-center items-center gap-2">
                {Array.from({ length: 5 }).map((_, index: number) => (
                    <RatingItem key={index} starsNumber={barWidths.length - index} index={index} widths={barWidths.reverse()} />
                ))}
            </div>
        </>
    );
};




const RatingItem = ({ starsNumber, index, widths }: { starsNumber: number, index: number, widths: number[] }) => {
    console.log(widths)
    return (
        <div key={index} className="flex gap-4">
            <div className="stars flex gap-1">
                {
                    Array.from({ length: 5 }).map((_, starIndex: number) => (
                        <RiStarSFill key={starIndex} className="h-6 w-6" fill={starIndex < starsNumber ? 'gold' : 'gray'} />
                    ))
                }
                <div className="w-[150px] h-4 bg-gray-300 mt-[5px]">
                    <div style={{ width: widths[index] + '%' }} className="h-full bg-[#e36643]"></div>
                </div>
                <p className="ml-2">{widths.length - index}</p>
            </div>
        </div>
    );
};








//   const RatingStats = (reviewSummary: ReviewSummary) => {
//     const { number_of_reviews, reviews_by_rating } = reviewSummary;
//     const totalReviews = (Object.keys(reviews_by_rating) as (keyof ReviewsByRating)[]).reduce((acc, rating) => {
//       return acc + Number(rating) * reviews_by_rating[rating];
//     }, 0);
  
//     const averageRating = totalReviews / number_of_reviews;
  
//     const barWidths = (Object.keys(reviews_by_rating) as (keyof ReviewsByRating)[]).map(rating => {
//       const count = reviews_by_rating[rating];
//       if (count == 0 || number_of_reviews == 0) {
//         return 0;
//       } else {
//         return (count / number_of_reviews) * 100;
//       }
//     });
  
//     return (
//       <>
//         <div className="flex gap-1 items-center">
//           {Array.from({ length: 5 }).map((_, index) => {
//             return (
//               <RiStarSFill
//                 key={index} {/* Ensure unique key for each star */}
//                 className="w-5 h-5 mt-1"
//                 fill={index + 1 <= (number_of_reviews == 0 ? 0 : averageRating) ? 'gold' : 'gray'}
//               />
//             );
//           })}
//           <span>{number_of_reviews} out of 5</span>
//         </div>
//         <p>Based on {number_of_reviews} review</p>
//         <div className="flex flex-col justify-center items-center gap-2">
//           {Array.from({ length: 5 }).map((_, index) => {
//             return (
//               <RatingItem
//                 key={index} {/* Ensure unique key for each rating item */}
//                 starsNumber={barWidths.length - index}
//                 index={index}
//                 widths={barWidths}
//               />
//             );
//           })}
//         </div>
//       </>
//     );
//   };


// const RatingItem = (starsNumber:number,index:number,widths:number[])=>{
//     return (
//         <div key={index} className="flex gap-4">
//             <div className="stars flex gap-1">
//                 {
//                     Array.from({length:5}).map((_:any,starindex:number)=>{
//                         return (
//                             <>
//                                 <RiStarSFill  key={starindex} className="h-6 w-6" fill={index < starsNumber ? 'gold' : 'gray' }  />
                                
//                             </>
//                         )
//                     })
//                     }
                    
//                     <div className="w-[150px] h-4 bg-gray-300 mt-[5px]">
//                         <div style={{width: widths[index] +'%'}} className="h-full bg-[#e36643]"></div>
//                     </div>
//                     <p className="ml-2">{widths.length - index}</p>
                

//             </div>

//         </div>
//     )
// }





const ShippingPolicy = ()=>{
    return (
        <div className="mt-6 flex gap-6 flex-col pr-2">
            <p>
            At E-STORE, we are committed to delivering your orders swiftly and efficiently. Our Shipping Policy outlines the details of our shipping process to ensure a seamless shopping experience for you.
            </p>
            <div>
                <span className="text-lg font-semibold mb-2">**Processing Time:**</span>
                <p>
                Orders are typically processed within 1-2 business days from the time of purchase. During peak seasons or promotional events, processing times may be slightly extended, but we always strive to get your order ready for shipment as quickly as possible.
                </p>
            </div>
            <div>
                <span className="text-lg font-semibold mb-2">**Shipping Methods:**</span>
                <p>
                We offer several shipping options to cater to your preferences. Our standard shipping option provides reliable delivery within [X] business days. For those who need their orders expedited, we also offer express shipping with delivery within [X] business days. Please note that shipping times may vary based on your location.
                </p>
            </div>
            <div>
                <span className="text-lg font-semibold mb-2">**Shipping Costs:**</span>
                <p>
                Shipping costs are calculated based on your order's weight, dimensions, destination, and chosen shipping method. You can view the shipping cost for your order during the checkout process before finalizing your purchase. We occasionally offer free shipping promotions, so keep an eye out for those special deals.
                </p>
            </div>
            <div>
                <span className="text-lg font-semibold mb-2">**Order Tracking:**</span>
                <p>
                Once your order is shipped, you will receive a confirmation email containing a tracking number. You can use this tracking number to monitor the status and progress of your shipment. Tracking information may take up to 24 hours to update after your order has been dispatched.
                </p>
            </div>
            <div>
                <span className="text-lg font-semibold mb-2">**Shipping Restrictions:**</span>
                <p>
                We currently offer shipping to [List of countries/regions you ship to]. Please ensure that the shipping address you provide is accurate and complete to avoid any delays or issues with your order. Certain items may have shipping restrictions based on local regulations. If your location is not currently supported for shipping, you will be notified during the checkout process.
                </p>
            </div>
            <div>
                <span className="text-lg font-semibold mb-2">**Customs and Duties:**</span>
                <p>
                For international orders, please be aware that customs and import duties may apply depending on your country's regulations. Any additional charges for customs clearance are the responsibility of the recipient. We recommend contacting your local customs office for more information about these potential fees.
                </p>
            </div>
            <div>
                <span className="text-lg font-semibold mb-2">**Address Accuracy:**</span>
                <p>
                It is crucial to provide accurate shipping information to ensure successful delivery. We cannot be held responsible for any delays or misdeliveries resulting from incorrect or incomplete addresses provided by the customer.
                </p>
            </div>
            <p>At E-STORE, your satisfaction is our priority. If you have any questions or concerns about our Shipping Policy or your specific order, please don't hesitate to contact our customer support team at e-store@my-shop.com .</p>

            <p>Thank you for choosing E-STORE. We look forward to serving you and delivering your order with care and efficiency.</p>

        </div>
    )
}





