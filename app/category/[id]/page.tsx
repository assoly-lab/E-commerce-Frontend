import BreadCrumb from "@/components/BreadCrumb"
import CategoryCountList from "@/components/categories/CategoryCountList"
import ProductsList from "@/components/categories/ProductsList"
import { Category, CategoryCountsList, Product } from "@/utils/Types"
import Image from "next/image"


const getCategoryProductsCount = async ()=>{
    try{
        const response = await fetch('http://localhost:8000/api/category/count',{cache:'no-store'})
        if(!response.ok){
            throw new Error('Something went wrong!')
        }
        const data = await response.json()
        return data
    }catch(e){
        const error = e as Error
        return error.message
    }
}



const getCategoryProductsList = async (id:string)=>{
    try{
        const response = await fetch(`http://localhost:8000/api/category/${id}/products/`,{cache:'no-store'})
        if (! response.ok){
            throw new Error('something went wrong !')
        }
        const data = await response.json()
        return data
    }catch(e){
        const error = e as Error
        return error.message
    }

}


const getCartegoryInfos = async (id:string)=>{

    try{
        const response = await fetch(`http://localhost:8000/api/category/${id}`,{cache:'no-store'})
        if(!response.ok){
            throw new Error('failed to fetch category')
        }
        const data = await response.json()
        return data[0]
    }catch(e){
        const error = e as Error
        return error.message
    }

}



export default async function Category({params}:{params: { id: string }}){
    const category:Category =  await getCartegoryInfos(params.id)
    const products:Product[] = await getCategoryProductsList(params.id)
    const categoryCounts:CategoryCountsList[] = await getCategoryProductsCount()
    return (
        <div className="w-full flex flex-col items-center">
            {category && 
            <div className="category w-[90%] md:w-[80%] md:h-[calc(255px_+_64px)] bg-gray-100 flex flex-col-reverse md:flex-row md:justify-between p-8 rounded-2xl">
                <div className="text mt-8 flex flex-col h-full gap-4 w-full md:w-[70%] justify-center ">
                    <p className="text-4xl font-semibold">{category.name}</p>
                    {/* @ts-expect-error Server Component */}
                    <BreadCrumb name={category.name} />
                    <p className="md:text-lg font-normal">{category.description}</p>
                </div>
                {category.image && <div className="img">
                    <Image className="w-[420px] h-[420px] md:w-[255px] md:h-[255px]" src={category.image!} width={255} height={255} alt={category.description!} />
                </div>}
            </div>}
            <div className="container w-full flex justify-center mt-20 ">
                <div className="md:w-[80%] w-[95%] flex gap-8 ">
                    <div className="categories w-[30%] hidden md:flex h-[300px] overflow-y-scroll flex-col gap-4">
                        <p className="text-2xl font-semibold" >Categories</p>
                        <CategoryCountList categoryCounts={categoryCounts} param={params.id} />
                    </div>

                        { products.length > 0 && Array.isArray(products) ?
                            <ProductsList products={products} />
                        :
                        <h2 className="text-2xl text-[#E73F10] font-semibold">No products available in this category at the moment!</h2>
                        }
                </div>

            </div>
        </div>
    )

}