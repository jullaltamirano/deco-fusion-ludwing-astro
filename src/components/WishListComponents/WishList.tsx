import { useEffect, useState } from "react"

import { WishlistCard } from "./WishlistCard"
import type { Product } from "../../porcelanatoData"
import { LuHeartOff } from "react-icons/lu"

export const WishList = () => {
   //* Variables
   const [ wishList, setWishList ] = useState<Product[]>()

   //* Efectos
   useEffect(() => {
      if (typeof window !== "undefined") {
         const storedWishlist = localStorage.getItem("wishlist");
         setWishList(storedWishlist ? JSON.parse(storedWishlist) : []);
      }
   }, [])

   return (
      <div className='py-4 gap-8 my-4 lg:gap-12 lg:my-8'>
         <h2 className='font-semibold text-2xl'>MI LISTA DE DESEOS</h2>
         <div className="flex flex-col gap-4 mt-4">
            {
               wishList?.length === 0 && (
                  <div className="rounded-lg w-full py-8 text-center">
                     <LuHeartOff className="text-[60px] mx-auto mb-4" />
                     NO TIENES PRODUCTOS EN TU LISTA DE DESEO
                  </div>
               )
            }
            {
               wishList?.map( ( el: Product ) => (
                  <WishlistCard 
                     key={ el.slug }
                     product={ el } 
                     setWishList={ setWishList }
                  />
               ))
            }
         </div>
      </div>
   )
}
