import { useState } from 'react'

import { FilterContainer } from './FilterContainer'
import { products, type Product } from '../../porcelanatoData'
import { ProductCard } from './ProductCard'

export const ProductPage = () => {
   //* Variables
   const [ productos, setProductos ] = useState<Product[]>( products )

  return (
   <section>
      <img className="w-full" src='/products_banner.jpg' />
      <div className="max-w-[1200px] mx-auto my-6 md:px-12 sm:px-16 px-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FilterContainer
               productos={ productos }
               setProductos={ setProductos }
            />
            <div className="col-span-1 md:col-span-3">
               <div className="grid grid-cols-6 gap-5">
                  {
                     productos.map(( pr: Product ) => ( 
                        <ProductCard 
                           key={ pr.slug }
                           imagen={ pr.imagen } 
                           modelo={ pr.modelo } 
                           slug={ pr.slug } 
                           formato={ pr.formato } 
                           precio={ pr.precio } 
                        /> 
                     ))
                  }
               </div>
            </div>
         </div>
      </div>
   </section>
  )
}
