import { fetchWithAuth } from "@/utils/Helpers"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"
import { IoCloseOutline } from "react-icons/io5"


type PasswordErrors = {
    general?:string
    current_password?:string,
    new_password?:  string,
    re_new_password?:string
}

export default function ChangePassword({setChangePassword}:{setChangePassword:React.Dispatch<React.SetStateAction<Boolean>>}){
    const [passwordChangeErrors,setPasswordChangeErrors] = useState<PasswordErrors>({})
    const ref = useRef<HTMLFormElement>(null)
    return (
        <div onClick={()=>setChangePassword(false)} className="fixed w-full h-screen top-0 lef-0 bg-black/50 flex justify-center items-center">
            <div onClick={(e)=>e.stopPropagation()} className="relative bg-gray-100 w-[90%] md:w-[40%] min-h-[60%] rounded-md py-8 " >
                <IoCloseOutline onClick={()=>setChangePassword(false)} className="absolute right-2 top-3 w-6 h-6 cursor-pointer text-red-500 hover:text-red-700" />
                <form ref={ref} className="flex flex-col w-full h-full justify-center items-center gap-2" action={async (formData:FormData)=>{
                    const errors:PasswordErrors = {}
                    const current_password = formData.get('current_password')
                    const new_password = formData.get('new_password')
                    const confirm_password = formData.get('re_new_password')

                    if(!current_password){
                        errors.current_password = 'Enter your current password!'
                    }
                    if(!new_password){
                        errors.new_password = 'Enter your new password!'
                    }
                    if(!confirm_password){
                        errors.re_new_password = 'Confirm your new password!'
                    }
                    
                    if(new_password && confirm_password && new_password !== confirm_password){
                        errors.general = "Passwords don't match!"
                    }
                    if(Object.keys(errors).length > 0 ){
                        setPasswordChangeErrors(errors)
                    }else{
                        try{
                            const response = await fetchWithAuth('https://abdo008.pythonanywhere.com/api/auth/users/set_password/',{
                                method:'POST',
                                body: formData
                            })
                            const data = await response.json()
                            if (!response.ok){
                                if(data.current_password) errors.current_password = data.current_password.join(' ')

                                if(data.new_password) errors.new_password = data.new_password.join(' ')
                                
                                if(data.non_fields_errors) errors.general = data.non_fields_errors.join(' ')

                                if(Object.keys(errors).length > 0 ){
                                    setPasswordChangeErrors(errors)
                                }
                            }else {
                                if (ref.current) ref.current.reset()
                                toast.success('Password changed successfully')
                                setChangePassword(false)

                            }
                        }catch(e){
                            const error = e as Error
                            errors.general = error.message
                            toast.error(error.message)
                            setPasswordChangeErrors(errors)

                        }
                    }

                }}>
                    <h1 className="text-2xl font-semibold">Change your Password</h1>
                    {passwordChangeErrors.general && <div className="w-[90%] bg-white py-2"><p className="w-full text-red-500 text-lg text-center">{passwordChangeErrors.general}</p></div>    }
                    <label htmlFor="current_password" className="text-base font-semibold cursor-pointer" >Current password:</label>
                    <input type="password" name="current_password" id="current_password" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
                    {passwordChangeErrors.current_password && <p className="w-[90%] text-left text-red-500">{passwordChangeErrors.current_password}</p>}
                    <label htmlFor="new_password" className="text-base font-semibold cursor-pointer" >New password:</label>
                    <input type="password" name="new_password" id="new_password" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
                    {passwordChangeErrors.new_password && <p className="w-[90%] text-left text-red-500">{passwordChangeErrors.new_password}</p>}
                    <label htmlFor="re_new_password" className="text-base font-semibold cursor-pointer" >Confirm password:</label>
                    <input type="password" name="re_new_password" id="re_new_password" className="w-[90%] p-4 rounded-md placeholder:text-black focus:outline-none focus:border focus:border-[#e36643] text-lg" />
                    {passwordChangeErrors.re_new_password && <p className="w-[90%] text-left text-red-500">{passwordChangeErrors.re_new_password}</p>}
                    <input className="text-white bg-[#e36643] hover:bg-[#E73F10] py-2 w-[40%] font-semibold rounded-md cursor-pointer mt-4" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}