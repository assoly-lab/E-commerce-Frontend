import { AppContext } from "@/Contexts/AppContext";
import { Cartitem, CartObject, Product } from "@/utils/Types";
import Image from "next/image";
import { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";




export default function CartItem({item}:{item:Cartitem}){
    const {cartItems,setCartItems, setCartCount} = useContext(AppContext)
    return (
        <>
        {item.product &&
            <div id={`${item.product?.id}`} className="relative flex items-center gap-4 py-4">
            <IoCloseOutline onClick={()=>{
                const id = item.product.id
                if(id){
                    setCartItems(cartItems.filter((product:Cartitem )=>product.product.id != Number(id)))
                    setCartCount((prev:number)=>  prev != 0 ? prev - 1 : 0)
                    const data = localStorage.getItem('cart')
                    if (data) {
                        const ids = JSON.parse(data)
                        const newData = ids.filter((prodId:CartObject) => prodId.id != Number(id) )
                        localStorage.setItem('cart',JSON.stringify(newData))
                    }
                }
               
                }} className="absolute text-white font-medium left-0 top-4 w-6 h-6 bg-[#E73F10] rounded-full cursor-pointer" />
            <Image src={item.product.main_image} width={90} height={90} alt={item.product.name} />
            <div className="infos flex flex-col">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-lg"><span className="font-medium">{item.quantity} x</span> {item.product.price} MAD</p>
            </div>
        </div>}
        </>
    )
}