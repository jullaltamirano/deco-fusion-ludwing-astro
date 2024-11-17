import { useEffect, useState } from "react"

import { FaPaperPlane } from "react-icons/fa"

import { CarritoCard } from "./CarritoCard"
import { MdOutlineRemoveShoppingCart } from "react-icons/md"

export interface ProductCart {
  modelo               : string
  slug                 : string
  coleccion            : string
  formato              : string
  m2_por_caja          : string
  superficie           : string
  material             : string
  variacion_tono       : string
  borde                : string
  ubicación            : string
  tipo_transito        : string
  junta_minima         : string
  lugar_uso            : string
  espesor              : string
  pais_origen          : string
  imagen               : string
  aplicacion           : string
  precio               : number
  cajas                : string
  largo                : string
  ancho                : string
  total                : string
  total_costo          : number
}

export const CarritoCompras = () => {
   //* Variables
   const [ cart, setCart ] = useState<ProductCart[]>()
   const [ total, setTotal ] = useState<number>( 0 )

   //* Efectos
   useEffect(() => {

      if ( typeof window !== "undefined" ) {
         const storedCart = localStorage.getItem( "cart" );
         setCart( storedCart ? JSON.parse( storedCart ) : [] );
      }

   }, [])

   useEffect(() => {

      const totales = cart?.map( el => el.total_costo )
      let suma = 0

      totales?.forEach( el => suma += el )

      setTotal( suma )

   }, [ cart ])

   //* Funciones
   const sendWhatsAppMessage = () => {

      let message = `*Hola, DecoFusion,*\n\nMe gustaría realizar un pedido:\n\n`
      cart?.forEach( el => {
         message += `*Modelo:* ${ el.modelo }\n*Formato:* ${ el.formato }\n*Ancho:* ${ el.ancho }\n*Largo:* ${ el.largo }\n*Total m2:* ${ el.total }\n*M2 por caja:* ${ el.m2_por_caja }\n*Cajas:* ${ el.cajas }\n*Costo Unitario:* S/ ${ el.precio }\n*Costo Total:* S/ ${ el.total_costo }\n\n`
      })

      const encodedMessage = encodeURIComponent( message );
      const whatsappURL = `https://wa.me/+51931748317?text=${ encodedMessage }`;
      window.open( whatsappURL, '_blank' );

   };

   return (
      <div className='py-4 gap-8 my-4 lg:gap-12 lg:my-8'>
         <h2 className='font-semibold text-2xl'>CARRITO DE COMPRA</h2>
         <div className="grid grid-cols-2 gap-4 mt-4">
            {
               cart && cart.length === 0 && (
                  <div className="rounded-lg w-full py-8 text-center col-span-2">
                     <MdOutlineRemoveShoppingCart className="text-[60px] mx-auto mb-4" />
                     NO HAY PRODUCTOS EN EL CARRITO DE COMPRAS
                  </div>
               )
            }
            {
               cart?.map( ( el: ProductCart ) => (
                  <CarritoCard 
                     key={ el.slug }
                     product={ el } 
                     setCart={ setCart }
                  />
               ))
            }
         </div>
         {
            cart && cart.length > 0 && (
               <>
                  <p className="mt-4 text-right text-lg block"><b>Total:</b> S/ { total.toFixed( 2 ) }</p>
                  <button onClick={ sendWhatsAppMessage } className="flex bg-black text-white text-sm px-6 py-2 rounded-lg items-center font-semibold mx-auto"><FaPaperPlane />&nbsp;&nbsp;Comprar por Whatsapp</button>
               </>
            )
         }
      </div>
   )
}
