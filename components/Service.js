import Image from "next/image"
function Service({image, service}) {
  return (
    <div className="flex flex-col items-center m-2 group hover:scale-125 hover:rounder-md transition duration-300">
        <Image className='rounded-full opacity-50 group-hover:opacity-100 transition ease-in duration-300' src={image} width={150} height={150} layout="intrinsic"/>
        <p className="group-hover:animate-pulse my-5">{service}</p>
    </div>
  )
}

export default Service