import Link from 'next/link'
import {BsInstagram, BsWhatsapp, BsTelephone} from 'react-icons/bs'
function Footer() {
  return (
    <div className='m-10 p-2 flex flex-col justify-evenly footer'>
      <div className='flex justify-evenly items-center'>
        <BsInstagram className='hover:animate-bounce h-8 text-xl cursor-pointer'/>
        <BsWhatsapp className='hover:animate-bounce h-8 text-xl cursor-pointer'/>
        <p className='flex flex-col items-center'><BsTelephone className='hover:animate-bounce h-8 text-xl cursor-pointer relative top-3 right-10 sm:top-0 sm:right-0' /><span className='invisible sm:visible'> +25483290101</span></p>
      </div>
      <p className='my-2 sm:m-10 flex cursor-pointer'><Link href='/terms'><p className='text-cyan-500 mr-2'>Terms and conditions apply.</p></Link></p>
      
    </div>
  )
}

export default Footer