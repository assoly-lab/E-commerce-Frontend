'use client'


import { AppContext } from "@/Contexts/AppContext"
import { fetchWithAuth } from "@/utils/Helpers"
import { LoginFormErrors } from "@/utils/Types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"



const handleUserCartItems = async (accessToken:string) => {
    const localData = localStorage.getItem('cart');
    
    if (localData) {
        const localCartItems = JSON.parse(localData)
        try {
            const response = await fetchWithAuth('http://localhost:8000/api/create/cartitems/', {
                method: 'POST',
                body: JSON.stringify({ cart_items: localCartItems }), // Make sure to stringify the body
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            // Handle different response statuses
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                const errorData = await response.json(); // Parse error response
                throw new Error(errorData.error || 'An error occurred while processing your request.');
            }
        } catch (e) {
            const error = e as Error
            console.error('Error:', error.message); // Log error for debugging
            // Optionally show error message to the user
            // For example: setError(error.message) if you're using state management for displaying errors
            return { error: error.message }; // Return the error message for further handling
        }
    } else {
        return { error: 'No cart data found in local storage.' }; // Handle case when localData is null
    }
}

const getUserCartItems = async (setCartCount:React.Dispatch<React.SetStateAction<number>>)=>{
    const localData = localStorage.getItem('cart')
    const accessToken = localStorage.getItem('access')
    if(!localData && accessToken){
        try{
        const response = await fetchWithAuth('http://localhost:8000/api/list/cartitems/')
        if(response.ok){
            const data = await response.json()
            setCartCount(data.length)
            const userCartItems = JSON.stringify(data)
            localStorage.setItem('cart',userCartItems)
        }else {
            const errorData = await response.json(); // Parse error response
            throw new Error(errorData.error || 'An error occurred while processing your request.');
        }
    } catch (e) {
        const error = e as Error
        console.error('Error:', error.message); // Log error for debugging
        // Optionally show error message to the user
        // For example: setError(error.message) if you're using state management for displaying errors
        return { error: error.message }; // Return the error message for further handlin

    }
}
}

export default function LoginForm(){
    const [formErrors,setFormErrors] = useState<LoginFormErrors>({})
    const {setCartCount} = useContext(AppContext)
    const ref = useRef<HTMLFormElement>(null)
    const router = useRouter()

    useEffect(()=>{
        const access = localStorage.getItem('access')
        if(access){
            router.push('/profile')
        }
    },[])
    return (
        <form ref={ref} className="py-6 bg-gray-200 rounded-lg w-[40%]  flex flex-col items-center gap-4" action={async (formData:FormData)=>{
            const errors:LoginFormErrors = {}
            const email = formData.get('email')
            const password = formData.get('password')
                if(!email){
                    errors.email = 'An email must be provided!'
                }
                if(!password){
                    errors.password = 'A password must be provided!'
                }

                if( Object.keys(errors).length > 0  ){
                    setFormErrors(errors)
                    return
                }
                try {
                    const response = await fetch('http://localhost:8000/api/auth/jwt/create/', {
                        method: 'POST',
                        body: formData,
                        credentials:'include',
                    });
            
                    if (!response.ok) {
                        // If the response is not ok, throw an error with the response status
                        const errorData = await response.json();
                        toast.error(errorData.detail || 'Something went wrong');
                    }
            
                    // If the request was successful, parse the response
                    const data = await response.json();
                    if(data?.access){
                        if(ref.current){
                            ref?.current.reset()
                        }
                        localStorage.setItem('access', data.access);
                        console.log('access token: ',data.access)
                        handleUserCartItems(data.access)
                        getUserCartItems(setCartCount)
                        router.push('/profile')
                        
                    }

            
                }catch(e) {
                    const error = e as Error
                    // Handle errors here (e.g., show an error message)
                   toast.error(error.message)
                }

        }} >
            <h2 className="text-3xl font-semibold">Login</h2>
            <p>Please login using account detail bellow.</p>
            <label htmlFor="email" className="text-base font-semibold cursor-pointer">Email</label>
            <input type="text" name="email" id="email" placeholder="Email" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
            {formErrors.email && <span className="text-red-500 text-sm font-medium">{formErrors.email}</span>}
            <label htmlFor="password" className="text-base font-semibold cursor-pointer">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
            {formErrors.password && <span className="w-[90%] text-red-500 text-sm font-medium" >{formErrors.password}</span>}
            <input type="submit" value="Sign In" className="w-[60%] text-xl font-semibold text-white bg-[#e36643] py-2 cursor-pointer rounded-md hover:bg-[#E73F10]"/>
            <div className="px-4 w-[90%]  flex justify-between">
                <Link href={'/register'} className="text-[#e36643] hover:text-[#E73F10] underline underline-offset-2">Create an account</Link>
                <Link href={'/reset'} className="text-[#e36643] hover:text-[#E73F10] underline underline-offset-2" >Forgot your password?</Link>
            </div>
        </form>
    )
}