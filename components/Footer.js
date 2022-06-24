import Link from 'next/link'
import {BsInstagram, BsWhatsapp, BsTelephone} from 'react-icons/bs'
function Footer() {
  return (
    <div className='m-10 p-2 sm:flex justify-evenly'>
      <p className='m-2 flex cursor-pointer'><Link href='/terms'><p className='text-cyan-500 mr-2'>Terms and conditions </p></Link> apply. </p>
      <div className='flex justify-evenly sm:flex-col items-center'>
        <BsInstagram className='hover:animate-bounce h-8 text-xl cursor-pointer'/>
        <BsWhatsapp className='hover:animate-bounce h-8 text-xl cursor-pointer'/>
        <p className='flex flex-col items-center'><BsTelephone className='hover:animate-bounce h-8 text-xl cursor-pointer' /> +25483290101</p>
      </div>
    </div>
  )
}

export default Footer