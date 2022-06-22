import Image from "next/image"
import landingImage from '../public/breads.jpg'
function Landing() {
  return (
    <div className="flex flex-col justify-between items-center m-5 sm:flex-row my-10 py-10">
        <h1 className="m-1 sm:w-5/6">Whether you love the simplicity of a banana or the taste of icing we’ve got sweet treats for every craving!</h1>
        <Image className="rounded-md sm:w-3/6 border border-black" src={landingImage} layout='intrinsic'/>
    </div>
  )
}

export default Landing