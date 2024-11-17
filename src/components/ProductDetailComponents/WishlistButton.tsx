import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import type { Product } from "../../porcelanatoData"

interface Props {
   product: Product
}

export const WishlistButton = ( props: Props ) => {
   //* Variables
   const { product } = props
   const [ addedWishlist, setAddedWishlist ] = useState( false )

   //* Efectos
   useEffect(() => {
      if ( localStorage.getItem( 'wishlist' ) ) {
         const wishListLS = JSON.parse( localStorage.getItem( 'wishlist' ) || '[]' )

         setAddedWishlist( wishListLS.find( ( el: Product ) => el.slug === product.slug ) )
      }
   }, [])

   // Añade o quita el producto del Wishlist del Local Storage
   const addToWishList = () => {
      let newArray
      let wishListLS = []

      // Obtenemos la lista de deseos completa
      if ( localStorage.getItem( 'wishlist' ) ) wishListLS = JSON.parse( localStorage.getItem( 'wishlist' ) || '[]' )

      // Si ya existe en la lista, lo quitamos, caso contrario lo añadimos
      if ( wishListLS.find( ( el: Product ) => el.slug === product.slug ) ) {
         newArray = wishListLS.filter( ( el: Product ) => el.slug !== product.slug )
      } else {
         newArray = [ ...wishListLS, product ]
      }

      localStorage.setItem( 'wishlist', JSON.stringify( newArray ) )
      setAddedWishlist( !addedWishlist )
   }

   return (
      <div className='flex justify-center items-center'>
         {
            addedWishlist
            ? ( <FaHeart className='text-red-600 cursor-pointer' onClick={ addToWishList } /> )
            : ( <FaRegHeart className='text-red-600 cursor-pointer' onClick={ addToWishList } /> )
         }
         <span  onClick={ addToWishList } className='text-sm cursor-pointer'>&nbsp;AÑADIR A LA LISTA DE DESEOS</span>
      </div>
   )
}
