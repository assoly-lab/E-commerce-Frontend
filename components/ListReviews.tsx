'use client'

import { AppContext } from "@/Contexts/AppContext"
import { Review} from "@/utils/Types"
import Image from "next/image"
import { useContext, useEffect } from "react"
import { RiStarSFill } from "react-icons/ri"




export default function ListReviews({id}:{id:string}){

    const {reviewsList,setReviewsList} = useContext(AppContext)

    useEffect(()=>{
        const getReviewsList = async (id:string)=>{
            try{
                const response = await fetch(`http://localhost:8000/api/productreviews/${id}/`)
                if(response.ok){
                    const data = await response.json()
                    setReviewsList(data)
                }
                }catch(error){
                    console.log(error)
                }
        }
        getReviewsList(id)
    },[])

    return (
        <div className="px-4 md:w-[80%] last:mb-0">
            {reviewsList.length > 0 &&
            reviewsList.map((review:Review,index:number)=>{
                const dateObj = new Date(review.created_at);
                return (
                    <div key={index} className="mb-8">
                        <div className="flex justify-between">
                            <div className="flex">
                                { 
                                Array.from({length:5}).map((_:any,index:number)=>{
                                    return (
                                            <RiStarSFill key={index}  className="h-6 w-6" fill={index < review.rating ? 'gold' : 'gray' }  />
                                    )
                                })

                                }
                            </div>
                            <span>{dateObj.toISOString().slice(0, 10)}</span>
                        </div>
                        <div>
                            <span>{review.name}</span>
                        </div>
                        
                        <p className="font-semibold">{review.title}</p>
                        <p>{review.review}</p>
                        {review.image && <Image className="mt-4" src={review.image} width={150} height={150} alt={review.title} />}
                    </div>
                )
            })

            }
        </div>
    )
}