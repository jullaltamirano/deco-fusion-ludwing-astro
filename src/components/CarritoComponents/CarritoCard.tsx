import Swal from "sweetalert2"

import { FaTrash } from "react-icons/fa"

import type { Product } from "../../porcelanatoData"
import type { ProductCart } from "./CarritoCompras"

interface Props {
  product: ProductCart
  setCart: any
}

export const CarritoCard = ( props: Props ) => {
  const { product, setCart } = props

  //* Funciones
  // Eliminar el producto de la cart
  const deleteFromCart = () => {

    Swal.fire({
      title: "ADVERTENCIA",
      text: "DESEA ELIMINAR EL PRODUCTO DEL CARRITO?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "ACEPTAR",
      cancelButtonText: "CANCELAR"
    }).then(( result ) => {
      if ( result.isConfirmed ) {
        let newArray
        let cartLS = []

        // Obtenemos la lista del shopping cart
        if ( localStorage.getItem( 'cart' ) ) cartLS = JSON.parse( localStorage.getItem( 'cart' ) || '[]' )
        
        // Eliminamos el producto de la cart y guardamos en el localStorage
        newArray = cartLS.filter( ( el: Product ) => el.slug !== product.slug )
        localStorage.setItem( 'cart', JSON.stringify( newArray ) )
        setCart( newArray )
      }
    });
  }

  console.log(product)

  return (
    <div className="rounded-3xl border border-zinc-200 border-opacity-70 shadow-lg flex flex-col sm:flex-row col-span-2 lg:col-span-1">
      <div className="flex justify-center">
        <a href={ `/producto/${ product.slug }`}>
          <img src={ product.imagen } className="h-[200px] rounded-t-3xl sm:rounded-l-3xl sm:h-[200px]" />
        </a>
      </div>
      <div className="flex flex-col justify-between w-full sm:flex-row">
        <div className="flex flex-col p-5 justify-center sm:gap-1">
          
          <a href={ `/producto/${ product.slug }`}>
            <span className="text-bold text-lg">{ product.modelo }</span>
          </a>
          <span className="text-xs">{ product.coleccion } | { product.formato } | { product.superficie } | { product.ubicación }</span>
          <span className="text-xs"><b>Largo:</b> { product.largo }</span>
          <span className="text-xs"><b>Ancho:</b> { product.ancho }</span>
          <span className="text-xs"><b>Total m2:</b> { product.total }</span>
          <span className="text-xs"><b>Precio x m2:</b> S/ { product.precio }</span>
          <span className="text-xs">{ +product.cajas } cajas</span>
          <span className="text-red-500 font-semibold">S/ { product.total_costo.toFixed( 2 ) } <span className="text-xs">(Valor por el Total mt<sup>2</sup>)</span></span>
        </div>
        <div className="flex justify-center items-center mb-4 sm:mb-0 sm:mr-6">
          <button onClick={ deleteFromCart } className="rounded-md border border-zinc-200 p-2 hover:bg-red-100 hover:border-red-100 hover:scale-105 transition"><FaTrash className="text-red-500" /></button>
        </div>
      </div>
    </div>
  )
}
