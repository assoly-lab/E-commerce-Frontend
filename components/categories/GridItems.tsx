import { Product } from "@/utils/Types";
import GridItem from "./GridItem";



export default function GridItems({products}:{products:Product[]}){

    return(
        <div>
            <GridItem product={products[0]} />
        </div>
    )
}