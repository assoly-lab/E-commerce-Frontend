import UserDetails from "@/components/profile/UserDetails";




export default async function ProfilePage(){
    
    return(
        <div className="w-full h-screen flex justify-center">
            <div className="w-[90%] h-[90%] md:h-[60%] md:w-[50%] bg-gray-100 rounded-md">
                <UserDetails />

            </div>
        
        </div>
    )
}