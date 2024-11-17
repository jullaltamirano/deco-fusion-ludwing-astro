import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5"
import { products, type Product } from "../../porcelanatoData"
import type { Filter } from "./FilterContainer"

interface Option {
   label: string
}

interface Props {
   openFilter        : boolean,
   setOpenFilter     : (value: boolean) => void,
   options           : Option[]
   title             : string
   productos         : Product[]
   setProductos      : any
   filter            : Filter
   setFilter         : any
}

export const FilterGroup = ( props: Props ) => {
   const { openFilter, setOpenFilter, options, title, productos, setProductos, filter, setFilter } = props

   //* Funciones
   const handleCheckbox = ( e: any ) => {
      const { name } = e.target

      let updatedFilter = { ...filter }
      updatedFilter = {
         ...updatedFilter,
         [ name ]: !updatedFilter[ name ]
      }

      const activeFilters = Object.keys( updatedFilter )
        .filter( el => updatedFilter[ el ])

      const filteredProducts = products.filter( product => 
         activeFilters.some( filterKey => 
            product.coleccion.toUpperCase().includes( filterKey.toUpperCase() ) ||
            product.superficie.toUpperCase().includes( filterKey.toUpperCase() ) ||
            product.formato.toUpperCase().includes( filterKey.toUpperCase() )
         )
      );

     setFilter( updatedFilter )
     setProductos( activeFilters.length === 0 ? products : filteredProducts )

   }


   return (
      <>
         <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{ title }&nbsp;</span>
            {
               openFilter
               ? ( <IoChevronUpOutline  onClick={ () => setOpenFilter( !openFilter ) } className="cursor-pointer" /> )
               : ( <IoChevronDownOutline  onClick={ () => setOpenFilter( !openFilter ) } className="cursor-pointer" /> )
            }
         </div>
         <ul className={`ml-4 mb-2 ${ openFilter ? 'block' : 'hidden' }`}>
            {
               options.map(( op: Option ) => ( 
                  <li>
                     <input 
                        type="checkbox" 
                        onChange={ handleCheckbox }
                        name={ op.label }
                        checked={ filter[op.label] }
                     />&nbsp;{ op.label }
                  </li> 
               ))
            }
         </ul>
      </>
   )
}