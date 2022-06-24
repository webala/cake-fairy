import Image from "next/image"
import landingImage from '../public/breads.jpg'
function Landing() {
  return (
    <div className="landing flex flex-col justify-between items-center sm:flex-row my-10">
        <Image className="rounded-md sm:w-3/6 border border-black" src={landingImage} layout='intrinsic'/>
        <h1 className="sm:m-7 sm:w-5/6 text">Whether you love the simplicity of a banana or the taste of icing we’ve got sweet treats for every craving!</h1>
    </div>
  )
}

export default Landing