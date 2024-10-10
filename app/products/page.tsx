import BreadCrumb from "@/components/BreadCrumb";
import CategoriesList from "@/components/products/CategoriesList";
import ParentCategoryCountList from "@/components/products/ParentCategoryCountList";


const getParentCategoriesList = async ()=>{
    try{
        const response = await fetch('http://localhost:8000/api/products')
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

export default async function ProductsPage(){
    const categories = await getParentCategoriesList()
    return (
        <>
        <div className="w-full bg-gray-100 flex items-center flex-col py-8">
            <p className="text-3xl font-semibold">Products</p>
            {/* @ts-expect-error Server Component */}
            <BreadCrumb  name="products" />
        </div>
        <div className="container w-full flex justify-center mt-20 ">
                <div className="md:w-[80%] w-[95%] flex gap-8 ">
                    <div className="categories w-[30%] hidden md:flex h-[300px] overflow-y-scroll flex-col gap-4">
                        <p className="text-2xl font-semibold" >Categories</p>
                        <ParentCategoryCountList categoryCounts={categories} />
                    </div>

                        { categories.length > 0 && Array.isArray(categories) ?
                            <CategoriesList categories={categories} />
                        :
                        <h2 className="text-2xl text-[#E73F10] font-semibold">No products available in this category at the moment!</h2>
                        }
                </div>

            </div>
        </>
    )
}