import { FaFacebookF,FaInstagram,FaYoutube  } from "react-icons/fa";
import { FaXTwitter,FaLocationDot  } from "react-icons/fa6";



export default function Info(){
    return (
        <div className=" hidden md:bg-black text-white md:py-2 md:flex md:justify-center ">
            <div className="md:w-[80%] md:flex md:justify-between">
                <div className="md:flex md:gap-4 items-center">
                    <h4>abdo@test.com</h4>
                    <div className="flex justify-center items-center gap-1">
                        <FaLocationDot className="hover:text-[#f98463]"/>
                        <p> 1536 Stellar Dr, Kenai, Alaska 99611, USA</p>
                    </div>
                </div>
                <div className="social-icons text-white md:flex md:gap-2 md:items-center">
                    <FaFacebookF className=" cursor-pointer hover:text-[#f98463]" />
                    <FaXTwitter className=" cursor-pointer hover:text-[#f98463]" />
                    <FaInstagram className=" cursor-pointer hover:text-[#f98463]" />
                    <FaYoutube className=" cursor-pointer hover:text-[#f98463]" />
                </div>
            </div>
        </div>
    )
}