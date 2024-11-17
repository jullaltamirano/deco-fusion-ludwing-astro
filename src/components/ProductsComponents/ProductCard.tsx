interface Props {
   imagen         : string
   modelo         : string
   formato        : string
   slug           : string
   precio         : number
}

export const ProductCard = ( props: Props ) => {
   //* Variables
   const { imagen, modelo, formato, slug, precio } = props

  return (
   <div className="lg:col-span-2 md:col-span-3 col-span-6 flex flex-col">
      <a href={ `/producto/${ slug }` } className="flex-grow flex items-center">
         <img src={ imagen } />
      </a>
      <span className="uppercase px-3 mt-2 mb-1 text-sm">{ modelo }&nbsp;{ formato }</span>
      <div className="border-t-[1px] border-b-[1px] flex justify-between items-center py-1">
         <a href={ `/producto/${ slug }` } className="text-xs bg-transparent text-neutral-800 py-0">VER M&Aacute;S</a>
         <span className="text-xs">S/ { precio?.toFixed(2) } m2</span>
      </div>
   </div>
  )
}
