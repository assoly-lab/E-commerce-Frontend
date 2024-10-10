'use client'


import React, { createContext, useState } from "react";
import { Cartitem, Category, ReviewsList } from "@/utils/Types"



type AppState = {
    categories?:Category[],
    setCategories:React.Dispatch<React.SetStateAction<Category[] | undefined>>,
    isCart: Boolean,
    setIsCart : React.Dispatch<React.SetStateAction<Boolean>>,
    isSearch : Boolean,
    setIsSearch : React.Dispatch<React.SetStateAction<Boolean>>,
    isSidebar: Boolean,
    setIsSidebar:React.Dispatch<React.SetStateAction<Boolean>>,
    isLoading: Boolean,
    setIsLoading:React.Dispatch<React.SetStateAction<Boolean>>,
    isQuickView : Boolean,
    setIsQuickView: React.Dispatch<React.SetStateAction<Boolean>>,
    productId:number | undefined,
    setProductId: React.Dispatch<React.SetStateAction<number | undefined>>,
    cartItems:Cartitem[] | [],
    setCartItems:React.Dispatch<React.SetStateAction<Cartitem[] | []>>,
    cartCount:number,
    setCartCount:React.Dispatch<React.SetStateAction<number>>,
    subTotal:number,
    setSubTotal:React.Dispatch<React.SetStateAction<number>>,
    reviewsList:ReviewsList,
    setReviewsList: React.Dispatch<React.SetStateAction<ReviewsList>>,
    
}


export const AppContext = createContext<AppState | any>({})

export default function AppContextProvider({children}: {children:React.ReactNode}){

    const [categories,setCategories] = useState<Category[] | undefined>(undefined)
    const [isCart,setIsCart] = useState<Boolean>(false)
    const [cartItems,setCartItems] = useState<Cartitem[] | []>([])
    const [cartCount,setCartCount] = useState<number>(0)
    const [isSearch,setIsSearch] = useState<Boolean>(false)
    const [isSidebar,setIsSidebar] = useState<Boolean>(false)
    const [isLoading,setIsLoading] = useState<Boolean>(false)
    const [bestSelling,setBestSelling] = useState<Boolean>(false)
    const [isQuickView,setIsQuickView] = useState<Boolean>(false)
    const [productId,setProductId] = useState<number | undefined>(undefined)
    const [subTotal,setSubTotal] = useState<number>(0)
    const [reviewsList,setReviewsList] = useState<ReviewsList>([])
    const values:AppState = {
        categories,
        setCategories,
        isCart,
        setIsCart,
        isSearch,
        setIsSearch,
        isSidebar,
        setIsSidebar,
        isLoading,
        setIsLoading,
        isQuickView,
        setIsQuickView,
        productId,
        setProductId,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        subTotal,
        setSubTotal,
        reviewsList,
        setReviewsList,
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
        
    )
}


