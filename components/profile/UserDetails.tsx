'use client'

import { fetchWithAuth } from "@/utils/Helpers"
import { UserInfos } from "@/utils/Types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ChangePassword from "../ChangePassword"



export default function UserDetails(){
    const [userDetails,setUserDetails] = useState<UserInfos>()
    const [error,setError] = useState<string>()
    const [isLoading,setIsLoading] = useState<Boolean>(false)
    const [changePassword,setChangePassword] = useState<Boolean>(false)
    const router = useRouter()

    useEffect(()=>{
        const access = localStorage.getItem('access')
        if(!access){
            router.push('/login')
        }
    },[])
    useEffect(()=>{
        const getUserInfos = async ()=>{
                try {
                    setIsLoading(true)
                    const response = await fetchWithAuth('http://localhost:8000/api/auth/users/me/')
                    if(response.status === 400){
                        localStorage.removeItem('access')
                        router.push('/')
                    }
                    if(!response.ok){
                        throw new Error('something went wrong!')
                    }
                    const data = await response.json()
                    console.log('user data: ',data)
                    setUserDetails(data)
                    setIsLoading(false)
                    
            }catch(e){
                const error = e as Error
                setIsLoading(false)
                 setError(error.message)
            }
                }
        getUserInfos()
    },[])

    return (
        <div className="w-full h-full flex justify-center">
            {changePassword && <ChangePassword setChangePassword={setChangePassword} />}
            {isLoading &&
            <div className="w-full h-full flex justify-center items-center">
                <p>Loading...</p>
            </div>
            }
            {error &&
            <div className="w-full h-full flex justify-center items-center">
                <p>{error}</p>
            </div>
            }
            {userDetails &&
            <div className="w-full h-full flex flex-col items-center gap-4 mt-8" >
                <Image className="rounded-full" src={'/user.jpg'} width={200} height={200} alt="user profile picture" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-4 bg-white px-4 py-2 rounded-md">
                        <p className="text-xl font-semibold text-black">First name:</p>
                        <p className="text-xl font-semibold text-[#E73F10]">{userDetails.first_name ? userDetails.first_name : 'Not provided' }</p>
                    </div>
                    <div className="flex gap-4 bg-white px-4 py-2 rounded-md">
                        <p className="text-xl font-semibold text-black">Last name:</p>
                        <p className="text-xl font-semibold text-[#E73F10]">{userDetails.last_name ? userDetails.last_name : 'Not provided'}</p>
                    </div>

                    <div className="flex gap-4 bg-white px-4 py-2 rounded-md">
                        <p className="text-xl font-semibold text-black">Username:</p>
                        <p className="text-xl font-semibold text-[#E73F10]">{userDetails.username ? userDetails.username : 'Not provided'}</p>
                    </div>

                    <div className="flex gap-4 bg-white px-4 py-2 rounded-md">
                        <p className="text-xl font-semibold text-black">Email:</p>
                        <p className="text-xl font-semibold text-[#E73F10]">{userDetails.email}</p>
                    </div>
                </div>

                <button onClick={()=>setChangePassword(!changePassword)} className="bg-[#e36643] hover:bg-[#E73F10] text-white py-2 px-4 text-xl font-semibold rounded-lg">Change your Password</button>
            </div>
            }

        </div>
    )
}