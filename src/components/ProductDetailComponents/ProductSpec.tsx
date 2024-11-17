import type { Product } from "../../porcelanatoData"

interface Props {
   product: Product
}

export const ProductSpec = ( props: Props ) => {
   const { product } = props
   
   return (
      <>
         <div className='flex justify-center lg:justify-start mt-4'>
            <table>
               <tbody>
                  <tr>
                     <td className='border border-neutral-200 bg-neutral-300 px-2 py-2 font-semibold text-center w-[150px] text-sm'>MODELO</td>
                     <td className='border border-neutral-200 px-4 py-2 text-right text-sm max-w-[180px] lg:min-w-[180px]'>{ product.modelo }</td>
                  </tr>
                  <tr>
                     <td className='border border-neutral-200 bg-neutral-300 px-2 py-2 font-semibold text-center w-[150px] text-sm'>COLECCI&Oacute;N</td>
                     <td className='border border-neutral-200 px-4 py-2 text-right text-sm max-w-[180px] lg:min-w-[180px]'>{ product.coleccion }</td>
                  </tr>
                  <tr>
                     <td className='border border-neutral-200 bg-neutral-300 px-2 py-2 font-semibold text-center w-[150px] text-sm'>FORMATO</td>
                     <td className='border border-neutral-200 px-4 py-2 text-right text-sm max-w-[180px] lg:min-w-[180px]'>{ product.formato }</td>
                  </tr>
                  <tr>
                     <td className='border border-neutral-200 bg-neutral-300 px-2 py-2 font-semibold text-center w-[150px] text-sm'>SUPERFICIE</td>
                     <td className='border border-neutral-200 px-4 py-2 text-right text-sm max-w-[180px] lg:min-w-[180px]'>{ product.superficie }</td>
                  </tr>
                  <tr>
                     <td className='border border-neutral-200 bg-neutral-300 px-2 py-2 font-semibold text-center w-[150px] text-sm'>MATERIAL</td>
                     <td className='border border-neutral-200 px-4 py-2 text-right text-sm max-w-[180px] lg:min-w-[180px]'>{ product.material }</td>
                  </tr>
                  <tr>
                     <td className='border border-neutral-200 bg-neutral-300 px-2 py-2 font-semibold text-center w-[150px] text-sm'>VARIACI&Oacute;N</td>
                     <td className='border border-neutral-200 px-4 py-2 text-right text-sm max-w-[180px] lg:min-w-[180px]'>{ product.variacion_tono }</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </>
   )
}
