import Link from "next/link";



export default async function BreadCrumb({name}:{name:string}){
    return(
        <div className="flex gap-2 text-xl" >
            <Link className="hover:text-[#E73F10]" href={'/'}>Home</Link>
            <p>{'>'}</p>
            <p className="text-[#E73F10]" >{name}</p> 
        </div>
    )
}