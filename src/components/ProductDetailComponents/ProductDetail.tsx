import { useState } from 'react'

import type { Product } from '../../porcelanatoData'
import { FaWhatsapp } from 'react-icons/fa'

import { WishlistButton } from './WishlistButton'
import { Calculator } from './Calculator'
import { ProductSpec } from './ProductSpec'

interface Props {
   product: Product
}

export const ProductDetail = ( props: Props ) => {
   //* Variables
   const { product } = props
   const [ previewImage, setPreviewImage ] = useState( product.imagen )
   const [ activeTab, setActiveTab ] = useState( 'buy' )

  return (
   <div className='grid grid-cols-1 lg:grid-cols-6 gap-4'>
      <div className='col-span-1'>
         <div className='flex lg:flex-col justify-center gap-4'>
            <img onClick={() => setPreviewImage( product.imagen )} src={ product.imagen } className='w-[100px] max-h-[100px] shadow-lg' />
            <img onClick={() => setPreviewImage( product.aplicacion )} src={ product.aplicacion } className='w-[100px] max-h-[100px] shadow-lg' />
         </div>
      </div>
      <div className='col-span-1 lg:col-span-3 mt-5 lg:mt-0 text-center'>
         <div className='mb-3 flex justify-center items-center lg:h-[350px] lg:mx-auto shadow-lg'>
            <img  src={ previewImage } className='h-full' />
         </div>
         <WishlistButton product={ product } />
         <a href="https://wa.link/3tc64i" target='_blank' className='mx-auto mt-2 flex justify-center items-center w-[220px] bg-green-500 rounded-md px-3 py-1 text-white'>
            <FaWhatsapp />&nbsp;<span className='text-sm font-semibold'>Consultar por Whatsapp</span>
         </a>
      </div>
      <div className='col-span-1 lg:col-span-2 border-t-[1px] border-neutral-300 mt-4 lg:mt-0 pt-2 lg:pt-0 lg:border-0'>
         <h4 className='text-center text-xl lg:text-left lg:text-2xl font-semibold'>{ product.modelo }&nbsp;{ product.formato }</h4>
         <span className='block text-center lg:text-left lg:text-xl'>S/ { product.precio }.00 m<sup>2</sup></span>
         <span className='block text-center lg:text-left text-xs mt-1'>(CAJA: { product.m2_por_caja } m<sup>2</sup>)</span>
         <div className='flex justify-center lg:justify-start gap-2 lg:gap-6 mt-3'>
            <button onClick={ () => setActiveTab('buy') } className={`${activeTab === 'buy' ? 'border-b-[1px] border-neutral-800 font-semibold' : ''} pr-3`}>COMPRAR</button>
            <button onClick={ () => setActiveTab('spec') } className={`${activeTab === 'spec' ? 'border-b-[1px] border-neutral-800 font-semibold' : ''} pr-3`}>ESPECIFICACIONES</button>
         </div>
         {
            activeTab === 'buy'
               ? <Calculator product={ product } />
               : <ProductSpec product={ product } />
         }
      </div>
   </div>
  )
}
