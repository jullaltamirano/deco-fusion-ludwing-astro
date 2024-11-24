import { FaArrowAltCircleDown } from 'react-icons/fa';
import type { Product } from '../../porcelanatoData';
import { FaCartArrowDown } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { validateNumberDecimal } from '../../utils/inputValidator';
import { BsInfoCircle, BsInfoCircleFill } from 'react-icons/bs';

interface Props {
   product     : Product
}

interface Calculator {
   largo       : string
   ancho       : string
}

export const Calculator = ( props: Props ) => {
   const { product } = props
   const [ addedToCart, setAddedToCart ] = useState<boolean>( false )
   const [ formCalculator, setFormCalculator ] = useState<Calculator>({
      largo    : '0',
      ancho    : '0'
   })

   
   //* Efectos
   useEffect(() => {
      if ( localStorage.getItem( 'cart' ) ) {
         const cartLS = JSON.parse( localStorage.getItem( 'cart' ) || '[]' )

         setAddedToCart( cartLS.find( ( el: Product ) => el.slug === product.slug ) )
      }
   }, [])

   const handleInputChange = ( e: any ) => {
      const { name, value } = e.target

      if ( !validateNumberDecimal( value ) ) return

      setFormCalculator({
         ...formCalculator,
         [ name ]: value
      })
   }

   const addToCart = ( product: Product, formCalculator: Calculator ) => {
      let newArray
      let cartLS = []

      // Obtenemos la lista de deseos completa
      if ( localStorage.getItem( 'cart' ) ) cartLS = JSON.parse( localStorage.getItem( 'cart' ) || '[]' )

      // Si ya existe en la lista, lo quitamos, caso contrario lo añadimos
      if ( cartLS.find( ( el: Product ) => el.slug === product.slug ) ) {
         newArray = cartLS.filter( ( el: Product ) => el.slug !== product.slug )
      } else {
         newArray = [ ...cartLS, { 
            ...product, 
            ...formCalculator,
            total: ( +formCalculator.largo * +formCalculator.ancho ).toFixed( 2 ),
            cajas: Math.ceil(( +formCalculator.largo * +formCalculator.ancho ) / +product.m2_por_caja ),
            total_costo: Math.ceil( +formCalculator.largo * +formCalculator.ancho ) * +product.precio
         }]
      }

      localStorage.setItem( 'cart', JSON.stringify( newArray ) )
      setAddedToCart( !addedToCart )
   }

   return (
      <>
         <div className='flex items-end justify-center lg:justify-start mt-4'>
            <div className='flex flex-col mx-2'>
               <span className='text-xs lg:text-sm'>Largo</span>
               <input
                  className='border-neutral-300 border rounded-sm px-2 text-sm w-[70px]' 
                  name='largo'
                  onChange={ handleInputChange }
                  value={ formCalculator.largo }
               />
            </div>
            x
            <div className='flex flex-col mx-2'>
               <span className='text-xs lg:text-sm'>Ancho</span>
               <input
                  className='border-neutral-300 border rounded-sm px-2 text-sm w-[70px]' 
                  name='ancho'
                  onChange={ handleInputChange }
                  value={ formCalculator.ancho }
               />
            </div>
            =
            <div className='flex flex-col mx-2'>
               <span className='text-xs lg:text-sm'>Total (m<sup>2</sup>)</span>
               <input
                  className='border-neutral-300 border rounded-sm px-2 text-sm w-[100px]' 
                  value={ ( +formCalculator.largo * +formCalculator.ancho ).toFixed( 2 ) }
                  readOnly 
               />
            </div>
         </div>
         <div className='mt-3 flex justify-center lg:justify-start'>
            <span className='ml-3 mr-2 font-semibold'>Cajas:</span>
            <span className='font-semibold'>{ Math.ceil(( +formCalculator.largo * +formCalculator.ancho ) / +product.m2_por_caja ) }</span>
         </div>
         <div className='mt-5'>
            <div className='flex justify-center lg:justify-start items-center'>
               <BsInfoCircleFill className='text-[14px]' />&nbsp;<span className='text-xs lg:text-sm'>Sugerimos agregar el 10% por merma</span>
            </div>
            <div className='flex justify-center lg:justify-start items-center'>
               <BsInfoCircleFill className='text-[14px]' />&nbsp;<span className='text-xs lg:text-sm'>Consulte por nuestro servicio de instalación</span>
            </div>
            <div className='flex justify-center lg:justify-start  items-center mt-2'>
               <FaArrowAltCircleDown className='text-[14px]' />&nbsp;<span className='text-xs lg:text-sm font-semibold'>Añade las cajas que necesites</span>
            </div>
            <button 
               className={ `flex items-center text-sm mt-3 mx-auto lg:mx-0 px-6 py-2 text-white disabled:bg-zinc-400
                  ${ addedToCart ? 'bg-red-600' : 'bg-red-400' }
               `}
               disabled={ +formCalculator.largo * +formCalculator.ancho === 0 }
               onClick={ () => addToCart( product, formCalculator ) }>
               <FaCartArrowDown />&nbsp;{ addedToCart ? 'ELIMINAR DEL CARRITO' : 'AÑADIR AL CARRITO' }
            </button>
         </div>
      </>
   )
}
