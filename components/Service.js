import Image from "next/image"
function Service({image, service}) {
  return (
    <div className="flex flex-col items-center m-2">
        <Image className='rounded-full' src={image} width={150} height={150} layout="intrinsic"/>
        <p className="my-5 text-xl">{service}</p>
    </div>
  )
}

export default Service