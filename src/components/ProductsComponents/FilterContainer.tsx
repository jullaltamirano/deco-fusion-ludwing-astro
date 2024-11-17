import { useState } from "react"

import { FilterGroup } from "./FilterGroup"
import type { Product } from "../../porcelanatoData"

interface Props {
   productos: Product[]
   setProductos: any
}

interface Option {
   label: string
}

export interface Filter {
   [key: string] : boolean
}

const filterOptionsColecciones: Option[] = [
   { label     : 'Ciudad' },
   { label     : 'Palacio' },
   { label     : 'Bosque' }
]

const filterOptionsFormatos: Option[] = [
   { label     : '60 x 120' },
   { label     : '80 x 80' },
   { label     : '120 x 120' },
   { label     : '20 x 120' }
]

const filterOptionsAcabado: Option[] = [
   { label     : 'Pulido' },
   { label     : 'Satinado' }
]

export const FilterContainer = ( props: Props) => {
   //* VARIABLES
   const { productos, setProductos } = props
   const [ openFilterColecciones, setOpenFilterColecciones ] = useState<boolean>(false)
   const [ openFilterFormatos, setOpenFilterFormatos ] = useState<boolean>(false)
   const [ openFilterAcabado, setOpenFilterAcabado ] = useState<boolean>(false)
   const [ filter, setFilter ] = useState<Filter>({
      Ciudad            : false,
      Palacio           : false,
      Bosque            : false,
      [ '60 x 120' ]    : false,
      [ '80 x 80' ]     : false,
      [ '120 x 120' ]   : false,
      [ '20 x 120' ]    : false,
      Pulido            : false,
      Satinado          : false
   })

  return (
   <div className="col-span-1">
      <div className="bg-neutral-200 mb-1 px-4 py-2">
         <span className="border-b-2 font-semibold" >FILTRAR POR</span>
      </div>
      <div className="bg-neutral-200 mb-4 p-4">
         <FilterGroup 
            openFilter={ openFilterColecciones } 
            setOpenFilter={ setOpenFilterColecciones } 
            title='COLECCIONES' 
            options={ filterOptionsColecciones } 
            productos={ productos }
            setProductos={ setProductos }
            filter={ filter }
            setFilter={ setFilter }
         />
         <FilterGroup 
            openFilter={ openFilterFormatos } 
            setOpenFilter={ setOpenFilterFormatos } 
            title='FORMATOS' 
            options={ filterOptionsFormatos } 
            productos={ productos }
            setProductos={ setProductos }
            filter={ filter }
            setFilter={ setFilter }
         />
         <FilterGroup 
            openFilter={ openFilterAcabado } 
            setOpenFilter={ setOpenFilterAcabado } 
            title='ACABADO' 
            options={ filterOptionsAcabado } 
            productos={ productos }
            setProductos={ setProductos }
            filter={ filter }
            setFilter={ setFilter }
         />
      </div>
   </div>
  )
}
