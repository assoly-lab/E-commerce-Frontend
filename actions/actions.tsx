'use server'

import { FormErrors, FormState } from "@/utils/Types";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";




export const handleLogin = async (formData:FormData)=>{
    try {
        const response = await fetch('http://localhost:8000/api/auth/jwt/create/', {
            method: 'POST',
            body: formData,
            credentials:'include'
        });

        if (!response.ok) {
            // If the response is not ok, throw an error with the response status
            const errorData = await response.json();
            return {"error":(errorData.detail || 'Something went wrong')};
        }

        // If the request was successful, parse the response
        const data = await response.json();
        
        // Handle successful login (e.g., save tokens, redirect, show success message, etc.)
        return data

        // Redirect or perform any other action as needed
        // e.g., window.location.href = '/dashboard';

    } catch (e) {
        const error = e as Error
        // Handle errors here (e.g., show an error message)
        return {"error":error.message}
    }
} 


export const handleReviewSubmit = async (formState: FormState,setFormState:React.Dispatch<React.SetStateAction<FormState>>,id:string,setFormErrors:React.Dispatch<React.SetStateAction<FormErrors>>,setStars:React.Dispatch<React.SetStateAction<number>>) => {

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
          revalidatePath('/product/${id}')
          return data
        //   if(data){
        //     if(reviewsList.length > 0){
        //         if(reviewsList[0].product == Number(id)){
        //             setReviewsList((prev:ReviewsList)=>[...prev,data])
        //         }else{
        //             setReviewsList([data])
        //         }
        //     }else{
        //         setReviewsList([data])
        //     }
        //   }
        } catch (error) {
          // Catch block handles both network errors and manually thrown errors
          console.log((error as Error).message)
          toast.error((error as Error).message || 'Something went wrong');
        }
  
      }

    
    
  };