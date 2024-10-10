import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRefund2Line } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiHeadsetBold } from "react-icons/pi";
import Marquee from 'react-fast-marquee'


export default function SlidingText(){

    return (
        <div className="relative overflow-hidden flex items-center whitespace-nowrap bg-[#f2f2f2] h-24 group">
          <Marquee autoFill pauseOnHover >
            <div className="flex gap-8 mr-8" >
                
                <Shipping />
                <Refund />
                <Checkout />
                <Support />
                
            </div>
          </Marquee>
        </div>
      );
} 




const Shipping = ()=>{
    return ( 
        <div className="flex flex-row gap-4 h-full items-center">
            <div className="icon text-black ">
                <LiaShippingFastSolid className="h-16 w-16 " />
            </div>
            <div >
                <p className="font-medium text-xl">Free Shipping </p>
                <p>on orders above <span className="font-medium">$99</span></p>
            </div>
        </div>
    )
}


const Refund = ()=>{
    return ( 
        <div className="flex flex-row gap-4 h-full items-center">
            <div className="icon text-black ">
                <RiRefund2Line className="h-16 w-16 " />
            </div>
            <div >
                <p className="font-medium text-xl">Money Back</p>
                <p>Money back in 15 days.</p>
            </div>
        </div>
    )
}

const Checkout = ()=>{
    return ( 
        <div className="flex flex-row gap-4 h-full items-center">
            <div className="icon text-black ">
                <RiSecurePaymentLine className="h-16 w-16 " />
            </div>
            <div >
                <p className="font-medium text-xl">Secure Checkout</p>
                <p>100% Payment Secure.</p>
            </div>
        </div>
    )
}


const Support = ()=>{
    return ( 
        <div className="flex flex-row gap-4 h-full items-center">
            <div className="icon text-black ">
                <PiHeadsetBold className="h-16 w-16 " />
            </div>
            <div >
                <p className="font-medium text-xl">Online Support</p>
                <p>24/7 online support</p>
            </div>
        </div>
    )
}
