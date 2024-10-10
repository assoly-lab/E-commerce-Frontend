'use client'

import { FormErrors, FormState, ReviewsList } from "@/utils/Types";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { RiStarSFill } from "react-icons/ri";
import { motion } from "framer-motion"
import { AppContext } from "@/Contexts/AppContext";
import { revalidatePath } from "next/cache";



const handleReviewSubmit = async (formState: FormState,setFormState:React.Dispatch<React.SetStateAction<FormState>>,id:string,setFormErrors:React.Dispatch<React.SetStateAction<FormErrors>>,reviewsList:ReviewsList,setReviewsList:React.Dispatch<React.SetStateAction<ReviewsList>>,setStars:React.Dispatch<React.SetStateAction<number>>) => {
    
    const formData = new FormData();
    const newErrors:FormErrors = {

    };

    // Validate title
    if (!formState.title) {
      newErrors.title = "Title is required";
    }
  
    // Validate review
    if (!formState.review) {
      newErrors.review = "Review is required";
    }
  
    // Validate rating (must be between 1 and 5)
    if (!formState.rating) {
      newErrors.rating = "Rating is required";
    } else if (formState.rating < 1 || formState.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
  
    // Validate image (if required) and check the file type/size
    if (formState.image) {
        if (formState.image.size > 5000000) { // Example: limit to 5MB
        newErrors.image = "Image must be less than 5MB";
        } else if (!['image/jpeg', 'image/png','image/jpg'].includes(formState.image.type)) {
        newErrors.image = "Only JPEG,PNG and JPG images are allowed";
        }
    }
  
    // Validate name
    if (!formState.name) {
      newErrors.name = "Name is required";
    }
  
    // Validate email
    if (!formState.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email format is invalid";
    }
    console.log(newErrors)
    // Set errors in the state
    setFormErrors(newErrors);
    const errors = (Object.keys(newErrors))
    console.log('errors keys: ',errors)
    if (errors.length === 0) {
        (Object.keys(formState) as (keyof FormState)[]).forEach((key) => {
        const value = formState[key as (keyof FormState)];
        
        // Only append if value is not undefined (optional properties)
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : value.toString());
        }
      });

      formData.append('product',id)
      
      try {
          const response = await fetch('http://localhost:8000/api/submitreview/', {
            method: 'POST',
            body: formData,
          });
        
          // Handle non-2xx responses (e.g., 400, 500)
          if (!response.ok) {
            const errorData = await response.json();  // Assuming your API sends error details as JSON
            toast.error(errorData.message || 'Failed to submit review');
            throw new Error(errorData.message || 'Failed to submit review');
          }
        
          // If the request is successful
          toast.success('Review added successfully');
          const data = await response.json()
          setFormState({
            product:Number(id),
            rating: undefined,
            title: '',
            review: '',
            image: undefined,
            name: '',
            email: ''
          })
          setStars(0)
          if(data){
            if(reviewsList.length > 0){
                if(reviewsList[0].product == Number(id)){
                    setReviewsList((prev:ReviewsList)=>[...prev,data])
                }else{
                    setReviewsList([data])
                }
            }else{
                setReviewsList([data])
            }
          }
        } catch (error) {
          // Catch block handles both network errors and manually thrown errors
          toast.error((error as Error).message || 'Something went wrong');
        }
  
      }

    
    
  };


export default function WriteReview({setWriteReview}:{setWriteReview: React.Dispatch<React.SetStateAction<Boolean>>}){
    const {reviewsList,setReviewsList} = useContext(AppContext)
    const [stars, setStars] = useState(0);
    const params = useParams<{id:string}>()
    const [hoveredStar, setHoveredStar] = useState<number | null>(null); // To store hovered stars
    const [formState,setFormState] = useState<FormState>({
        product:Number(params.id),
        rating: undefined,
        title: '',
        review: '',
        image: undefined,
        name: '',
        email: ''
      }) 
    const [formErrors,setFormErrors] = useState<FormErrors>({
        rating: undefined,
        title: undefined,
        review: undefined,
        image: undefined,
        name: undefined,
        email: undefined
      }) 

    return (
      <motion.div className="flex flex-col justify-center items-center w-full"
      initial={{height:0,opacity:0}}
      animate={{height:'auto',opacity:1}}
      exit={{height:0,opacity:0}}
      >

            <p>Rating</p>
            <div className="flex justify-center items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex justify-center w-full">
                    <RiStarSFill
                    
                    fill={
                        // If a star is hovered, use hoveredStar; otherwise, use stars for the fill
                        index + 1 <= (hoveredStar ?? stars) ? "#fb923c" : "#D6DBDF"
                    }
                    cursor="pointer"
                    className="star hover:fill-orange-400 w-8 h-8"
                    // Set stars when clicked, or reset if the same star is clicked
                    onClick={() =>{ 
                        setStars((prevStars) => (prevStars === index + 1 ? 0 : index + 1))
                        setFormState((prevState:FormState) => ({
                            ...prevState,
                            rating:  index + 1,
                        }));
                    }
                    }
                    // Handle hover enter
                    onMouseEnter={() => setHoveredStar(index + 1)}
                    // Reset hover when mouse leaves the star component
                    onMouseLeave={() => setHoveredStar(null)}
                    />
                </div>
                ))}
                <span>{formErrors.rating && formErrors.rating}</span>
            </div>
            <form className="flex flex-col items-center" onSubmit={(e)=>{
                e.preventDefault()
                handleReviewSubmit(formState,setFormState,params.id,setFormErrors,reviewsList,setReviewsList,setStars)}} >
                <div className="mt-4 w-full md:w-[80%] flex flex-col items-center gap-2 ">
                    <label htmlFor="title" className="cursor-pointer text-lg font-medium">Review title</label>
                    <input id="title" type="text" placeholder="Review Title" className="px-2 py-4 border border-gray-300 w-[90%] md:w-[60%] outline-none focus:outline-none focus:border-2 focus:border-[#E73F10]" 
                    value={formState.title}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        setFormState((prevState:FormState) => ({
                            ...prevState,
                            title: e.target.value
                        }));
                    }
                }
                    />
                    {formErrors.title &&  <span>formErrors.title</span>}
                    <div className="flex flex-col w-full items-center gap-2">
                        <label htmlFor="review" className="cursor-pointer text-lg font-medium">Review</label>
                        <textarea name="review" placeholder="Review..." id="review" className="px-2 py-4 border border-gray-300 w-[90%] md:w-[60%] outline-none focus:outline-none focus:border-2 focus:border-[#E73F10]" 
                        value={formState.review}
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
                            setFormState((prevState:FormState) => ({
                                ...prevState,
                                review: e.target.value
                            }));
                            }
                        }
                        ></textarea>
                        <span>{formErrors.review && formErrors.review}</span>
                    </div>
                    <div className="w-full">

                <div className="flex flex-col gap-2 items-center justify-center w-full">
                    <p className="text-lg font-medium">picture (optional)</p>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[60%] h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" accept="image/*"
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setFormState((prevState:FormState) => ({
                                        ...prevState,
                                        image: e.target.files?.[0]
                                    }));
                                    }
                                }
                                />
                            </label>
                        </div>
                        {formErrors.image && <span> formErrors.image</span>}
                </div> 

                    </div>
                        <div className="flex flex-col w-full items-center gap-2">
                            <label htmlFor="name" className="cursor-pointer text-lg font-medium">Name (displayed publicly like <span></span> )</label>
                            <input type="text" name="name" placeholder="Enter your name (Public)" id="name" className="px-2 py-4 border border-gray-300 w-[90%] md:w-[60%] outline-none focus:outline-none focus:border-2 focus:border-[#E73F10]" 
                            value={formState.name}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                setFormState((prevState:FormState) => ({
                                    ...prevState,
                                    name: e.target.value
                                }));
                                }
                            }
                            />
                            {formErrors.name && <span>formErrors.name</span>}
                        </div>
                        <div className="flex flex-col w-full items-center gap-2">
                            <label htmlFor="email" className="cursor-pointer text-lg font-medium">E-mail</label>
                            <input type="text" name="email" placeholder="Enter your E-mail (Private)" id="email" className="px-2 py-4 border border-gray-300 w-[90%] md:w-[60%] outline-none focus:outline-none focus:border-2 focus:border-[#E73F10]" 
                            value={formState.email}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                setFormState((prevState:FormState) => ({
                                    ...prevState,
                                    email: e.target.value
                                }));
                                }
                            }
                            />
                            {formErrors.email &&  <span>formErrors.email</span>}
                        </div>
                        <div className="w-[90%] md:w-[60%] mb-4">
                            <p>How we use your data: We’ll only contact you about the review you left, and only if necessary. By submitting your review, you agree to E-STORE’s terms, privacy and content policies.</p>
                        </div>
                        <input type={'submit'}  className="text-2xl font-semibold text-white bg-[#e76642] hover:bg-[#E73F10] px-4 py-2 w-[250px] rounded-md cursor-pointer" value={'Submit review'} />
                        <button onClick={()=>setWriteReview(false)} className="text-xl font-semibold text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 w-[150px] rounded-md">Cancel</button>
                    </div>
                </form>
      </motion.div>
    );
}