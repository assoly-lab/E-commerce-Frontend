

export type Category = {
    id?:number,
    name?:string,
    description?:string,
    image?:string,
    children?:Category[]
}


export type Img={
    image:string
}

export type Product = {
    id:number,
    name:string,
    description?:string,
    price:number,
    stock:number,
    main_image:string,
    images:Img[] | [],
    category:number,
    created_at:string,
}


export type TimeLeft = {
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
  }


  export type CartObject = {
    quantity: number,
    id: number
  }


  export type Cartitem = {
    quantity:number,
    product:Product,
  }

  export type section = 'review' | 'shipping'


  export type ReviewsByRating = {
    '1':number,
    '2':number,
    '3':number,
    '4':number,
    '5':number,
  }

export type ReviewSummary = {
  number_of_reviews : number,
  reviews_by_rating: ReviewsByRating,
  
}



export type Review = {
  id:number,
  product:number,
  user?:number,
  title:string,
  review:string,
  image?:string,
  name?:string,
  rating:number,
  created_at:number,
}

export type ReviewsList = Review[]



export type FormState = {
  product:number,
  rating?:number,
  title?: string,
  review?:string,
  image?:File,
  name?:string,
  email?:string

} 
export type FormErrors = {
  rating?:string,
  title?: string,
  review?:string,
  image?:string,
  name?:string,
  email?:string
} 



export type LoginFormErrors = {
  email?:string,
  password?:string
}
export type RegisterFormErrors = {
  first_name?:string,
  last_name?:string,
  email?:string,
  password?:string
}


export type CategoryCountsList = {
  id:number,
  name:string,
  description?:string,
  image?:string,
  product_count:number

}




export type UserInfos = {
  id:number,
  username:string,
  first_name:string,
  last_name:string,
  email:string,

}