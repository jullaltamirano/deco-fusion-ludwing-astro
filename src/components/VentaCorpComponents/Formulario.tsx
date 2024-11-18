import { useState } from 'react'
import { validateNumber } from '../../utils/inputValidator'
import axios from 'axios'

interface Form {
   nombres        : string
   apellidos      : string
   empresa        : string
   email          : string
   telefono       : string
   distrito       : string
   mensaje        : string
}

export const Formulario = () => {
   const [ formIsLoading, setFormIsLoading ] = useState<boolean>( false )
   const [ formSuccess, setFormSuccess ] = useState<boolean>( false )
   const [ form, setForm ] = useState<Form>({
      nombres     : '',
      apellidos   : '',
      empresa     : '',
      email       : '',
      telefono    : '',
      distrito    : '',
      mensaje     : '',
   })

   //* Funciones
   // Modificar los inputs del formulario
   const handleInputChange = ( e: any ) => {
      const { name, value } = e.target

      if ( name === 'telefono' && !validateNumber( value ) ) return
      if ( name === 'nombres' && value.length > 30 ) return
      if ( name === 'apellidos' && value.length > 30 ) return
      if ( name === 'empresa' && value.length > 30 ) return
      if ( name === 'distrito' && value.length > 20 ) return

      setFormSuccess( false )

      setForm({
         ...form,
         [ name ] : value
      })
   }

   // Enviar información del formulario
   const submitForm = async ( e: any ) => {
      e.preventDefault()

      setFormIsLoading( true )

      const htmlContent = `<html><head></head><body><h2>DECOFUSION - VENTA CORPORATIVA</h2><p>Ha recibido un nuevo mensaje a su página web</p><p><b>Nombres:</b> <span>${ form.nombres }<span></p><p><b>Apellidos:</b> <span>${ form.apellidos }<span></p><p><b>Empresa:</b> <span>${ form.empresa }<span></p><p><b>Email:</b> <span>${ form.email }</span></p><p><b>Telefono:</b> <span>${ form.telefono }</span></p><p><b>Distrito:</b> <span>${ form.distrito }</span></p><p><b>Mensaje:</b> <span>${ form.mensaje }</span></p></body></html>`;
      const body = {
         sender: { name: 'DecoFusion', email: 'decofusionac@gmail.com' },
         to: [{ email: 'decofusionac@gmail.com', name: 'DecoFusion' }],
         subject: 'DecoFusion Venta Corporativa',
         htmlContent: htmlContent,
      };

      try {
         const data = await axios.post('https://api.brevo.com/v3/smtp/email', body, {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'api-key': import.meta.env.PUBLIC_BREVO_API_KEY,
            },
         });

         if ( +data.status === 201 ){
            setForm({
               nombres     : '',
               apellidos   : '',
               empresa     : '',
               email       : '',
               telefono    : '',
               distrito    : '',
               mensaje     : '',
            })
            setFormSuccess( true )
         }

         setFormIsLoading( false )
      } catch ( error ) {
         console.error( error );
         setFormIsLoading( false )
      }
   }

   return (
      <form onSubmit={ submitForm } className="grid grid-cols-2 gap-4 mt-3">
         <div className="col-span-1">
            <label htmlFor="nombres" className="text-xs font-semibold">NOMBRES:</label>
            <input 
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='nombres'
               value={ form.nombres }
               onChange={ handleInputChange }
               autoComplete='off'
               required
            />
         </div>
         <div className="col-span-1">
            <label htmlFor="apellidos" className="text-xs font-semibold">APELLIDOS:</label>
            <input 
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='apellidos'
               value={ form.apellidos }
               onChange={ handleInputChange }
               autoComplete='off'
               required
            />
         </div>
         <div className="col-span-1">
            <label htmlFor="empresa" className="text-xs font-semibold">EMPRESA:</label>
            <input 
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='empresa'
               value={ form.empresa }
               onChange={ handleInputChange }
               autoComplete='off'
               required
            />
         </div>
         <div className="col-span-1">
            <label htmlFor="email" className="text-xs font-semibold">EMAIL:</label>
            <input 
               type='email'
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='email'
               value={ form.email }
               onChange={ handleInputChange }
               autoComplete='off'
               required
            />
         </div>
         <div className="col-span-1">
            <label htmlFor="telefono" className="text-xs font-semibold">TELÉFONO:</label>
            <input 
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='telefono'
               value={ form.telefono }
               onChange={ handleInputChange }
               autoComplete='off'
               required
            />
         </div>
         <div className="col-span-1">
            <label htmlFor="distrito" className="text-xs font-semibold">DISTRITO:</label>
            <input 
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='distrito'
               value={ form.distrito }
               onChange={ handleInputChange }
               autoComplete='off'
            />
         </div>
         <div className="col-span-2">
            <label htmlFor="mensaje" className="text-xs font-semibold">¿CÓMO PODEMOS AYUDARTE?</label>
            <textarea 
               className="rounded px-2 py-1 border-[1px] w-full active:border-blue-400 focus:border-blue-400 focus:outline-none text-sm"
               name='mensaje'
               value={ form.mensaje }
               onChange={ handleInputChange }
               autoComplete='off'
               required
            />
         </div>
         <div className="col-span-2 text-center">
            <button 
               type='submit'
               className='bg-red-500 px-6 py-1 text-white font-semibold text-sm'
            >
               {
                  formIsLoading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'
               }
            </button>
            {
               formSuccess && ( <span className='text-green-600 text-sm block'>Formulario enviado con éxito</span> )
            }
         </div>
      </form>
   )
}
