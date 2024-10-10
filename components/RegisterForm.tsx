'use client'

import { RegisterFormErrors } from "@/utils/Types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import toast from "react-hot-toast"



export default function RegisterForm(){
    const [ formErrors,setFormErrors ] = useState<RegisterFormErrors>({})
    const ref = useRef<HTMLFormElement>(null)
    const router = useRouter()
    return (
        <form ref={ref} action={async (formData:FormData)=>{
            const errors:RegisterFormErrors = {}
            const firstName = formData.get('first_name')
            console.log('first name: ',firstName)
            const lastName = formData.get('last_name')
            const email = formData.get('email')
            const password = formData.get('password')


                if(!firstName){
                    errors.first_name = 'First name must be provided!'
                }
                if(!lastName){
                    errors.last_name = 'Last name must be provided!'
                }
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
                    const response = await fetch('http://localhost:8000/api/auth/jwt/users/', {
                        method: 'POST',
                        body: formData,
                    });
            
                    if (!response.ok) {
                        // If the response is not ok, throw an error with the response status
                        const errorData = await response.json();
                        toast.error(errorData.detail || 'Something went wrong');
                    }
            
                    // If the request was successful, parse the response
                    const data = await response.json();
                    if(data){
                        if(ref.current){
                            ref?.current.reset()
                        }
                        
                        router.push('/')
                    }

            
                }catch(e) {
                    const error = e as Error
                    // Handle errors here (e.g., show an error message)
                   toast.error(error.message)
                }

        }} className="py-6 bg-gray-200 rounded-lg w-[40%]  flex flex-col items-center gap-4">
            <h2 className="text-3xl font-semibold">Register</h2>
            <p>Please register using account detail bellow.</p>
            <div className="w-full flex flex-col justify-center items-center">
                <label htmlFor="first_name" className="w-[90%] mb-2 text-base font-semibold cursor-pointer">First name</label>
                <input type="text" name="first_name" id="first_name" placeholder="First name" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
                {formErrors.first_name && <span className="w-[90%] text-red-500 text-sm font-medium">{formErrors.first_name}</span> }
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <label htmlFor="last_name" className="w-[90%] mb-2 text-base font-semibold cursor-pointer">Last name</label>
                <input type="text" name="last_name" id="last_name" placeholder="Last name" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
                {formErrors.last_name && <span className="w-[90%] text-red-500 text-sm font-medium">{formErrors.last_name}</span> }
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <label htmlFor="email" className="w-[90%] mb-2 text-base font-semibold cursor-pointer">Email</label>
                <input type="text" name="email" id="email" placeholder="Email" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
                {formErrors.email && <span className="w-[90%] text-red-500 text-sm font-medium">{formErrors.email}</span>}
            </div>
            <div className="w-full flex flex-col justify-center items-center">
            <label htmlFor="password" className="w-[90%] mb-2 text-base font-semibold cursor-pointer">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
            {formErrors.password && <span className="w-[90%] text-red-500 text-sm font-medium" >{formErrors.password}</span>}
            </div>
            <input type="submit" value="Register" className="w-[60%] text-xl font-semibold text-white bg-[#e36643] py-2 cursor-pointer rounded-md hover:bg-[#E73F10]"/>
            <div className="px-4 w-[90%] flex justify-between">
                <Link href={'/'} className="text-[#e36643] hover:text-[#E73F10] underline underline-offset-2">Go back to store</Link>
                <Link href={'/login'} className="text-[#e36643] hover:text-[#E73F10] underline underline-offset-2">You have an account? Login</Link>
            </div>
        </form>
    )
}