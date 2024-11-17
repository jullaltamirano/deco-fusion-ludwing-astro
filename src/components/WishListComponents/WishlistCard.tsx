import { FaXmark } from "react-icons/fa6"
import type { Product } from "../../porcelanatoData"

interface Props {
  product: Product
  setWishList: any
}

export const WishlistCard = ( props: Props ) => {
  const { product, setWishList } = props

  //* Funciones
  // Eliminar el producto de la wishlist
  const deleteFromWishList = () => {
    let newArray
    let wishListLS = []

    // Obtenemos la lista de deseos completa
    if ( localStorage.getItem( 'wishlist' ) ) wishListLS = JSON.parse( localStorage.getItem( 'wishlist' ) || '[]' )

    // Eliminamos el producto de la wishlist y guardamos en el localStorage
    newArray = wishListLS.filter( ( el: Product ) => el.slug !== product.slug )
    localStorage.setItem( 'wishlist', JSON.stringify( newArray ) )
    setWishList( newArray )
  }

  return (
    <div className="rounded-3xl border border-zinc-200 border-opacity-70 shadow-lg flex flex-col sm:flex-row">
      <div className="flex justify-center">
        <a href={ `/producto/${ product.slug }`}>
          <img src={ product.imagen } className="h-[200px] rounded-t-3xl sm:rounded-l-3xl sm:h-[200px]" />
        </a>
      </div>
      <div className="flex flex-col justify-between w-full sm:flex-row">
        <div className="flex flex-col p-5 justify-center sm:gap-2">
          
          <a href={ `/producto/${ product.slug }`}>
            <span className="text-bold text-lg">{ product.modelo }</span>
          </a>
          <span className="text-xs">{ product.coleccion } | { product.formato } | { product.superficie } | { product.ubicación }</span>
          <span className="text-red-500 font-semibold">S/ { product.precio }.00</span>
        </div>
        <div className="flex justify-center items-center mb-4 sm:mb-0 sm:mr-6">
          <button onClick={ deleteFromWishList } className="rounded-md border border-zinc-200 p-2 hover:bg-red-100 hover:border-red-100 hover:scale-105 transition"><FaXmark className="text-red-500" /></button>
        </div>
      </div>
    </div>
  )
}
