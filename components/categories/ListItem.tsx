import { AppContext } from "@/Contexts/AppContext"
import { fetchWithAuth } from "@/utils/Helpers"
import { Cartitem, CartObject, Product  } from "@/utils/Types"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import toast from "react-hot-toast"
import { FaRegEye } from "react-icons/fa6"
import { LiaCartPlusSolid } from "react-icons/lia"


export default function ListItem({product}:{product:Product}){
    const {setIsQuickView,setProductId,cartItems,setCartCount,setCartItems } = useContext(AppContext)
    const handleCart = (id:number)=>{
        const cart = localStorage.getItem('cart')
        if (cart){
            const data: CartObject[] = JSON.parse(cart)
            const filter = data.some((obj:CartObject)=>obj.id === id)
            console.log(filter)
            if(filter){
                return
            }
            data.push({quantity:1,id:id})
            localStorage.setItem('cart',JSON.stringify(data))
        }else{
            localStorage.setItem('cart',JSON.stringify([{quantity:1,id:id}]))
        }
    }


    return (
        <div className="bg-gray-100 flex flex-col md:flex-row gap-8 p-8 w-full md:h-[300px] rounded-lg" >
        <div className="relative md:w-[30%] md:h-[260px] group bg-white rounded-lg p-2" >
            <Link className="absolute h-full w-full top-0 left-0 z-40" href={`https://e-commerce-frontend-three-mu.vercel.app/product/${product.id}`}></Link>
            <Image className="rounded-lg w-full h-full transition duration-300 group-hover:opacity-0" src={`https://abdo008.pythonanywhere.com${product.main_image}`} width={260} height={260} alt={product.description!} />
            <Image className="rounded-lg absolute opacity-0 top-0 w-full h-full left-0  z-10 md:my-0  transition duration-300 ease-in-out group-hover:opacity-100" src={product.images!.length > 0  ? `https://abdo008.pythonanywhere.com${product.images![0].image}` : `https://abdo008.pythonanywhere.com${product.main_image}` } width={260} height={260} alt={product.name} />
        </div>

        <div className="infos md:w-[70%] flex flex-col gap-4">
            <Link href={`https://e-commerce-frontend-three-mu.vercel.app/product/${product.id}`} className="text-xl md:text-2xl font-semibold hover:text-[#E73F10] cursor-pointer line-clamp-1 ">{product.name}</Link>
            <p className="text-lg text-white font-semibold  bg-[#E73F10] px-2 rounded-lg w-fit">{product.price} MAD</p>
            <p className="line-clamp-4 text-base font-medium">{product.description}</p>
            <div className="flex gap-4">
            <button onClick={(e)=>{
                e.stopPropagation()
                setIsQuickView(true)
                setProductId(product.id)
        }} className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors"><FaRegEye className="w-[26px] h-[26px]" /></button>
            <button onClick={async(e)=>{
                e.stopPropagation()
                handleCart(product.id)
                if(cartItems.find((item:Cartitem)=>item.product?.id == product.id)){
                    toast.error('Item already added to cart!')
                    return
                }
                const access = localStorage.getItem('access')
                if(access){

                    const response = await fetchWithAuth('https://abdo008.pythonanywhere.com/api/create/cartitem/',{
                        method:'POST',
                        headers:{
                            'Content-type':'application/json'
                        } ,
                        body:JSON.stringify({'cart_item':{
                            'id':product.id,
                            'quantity':1
                        }})
                    })
                    if(response.ok){
                        const data = await response.json()
                        return data
                    }
            }
                setCartItems((prev:Product[] | [])=>[...prev,{quantity:1,product:product}])
                setCartCount((prev:number)=>prev + 1)
                toast.success('Item added to cart!')
            }} className="text-white bg-gray-700 py-1 px-2 rounded hover:bg-[#E73F10] transition-colors"> <LiaCartPlusSolid className="w-[26px] h-[26px]" /></button>
        </div>
        </div>
        </div>
    )
}