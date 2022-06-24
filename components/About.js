import Image from "next/image"
import birthday from "../public/birthday.jpg";
function About() {
  return (
    <div className="about flex flex-col">
        <h1 className="text-2xl heading">About me</h1>
        <div className="flex flex-col sm:flex-row items-center sm:m-10 sm:p-10 py-10 justify-evenly">
            <Image className="rounded-full" src={birthday} layout='intrinsic' width={300} height={300}/>
            <p className="sm:w-1/2 text-xl pt-5 sm:p-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor omnis aliquid, aspernatur obcaecati nam vel totam maxime a molestiae mollitia itaque voluptates iste, perferendis aperiam. Praesentium sunt voluptate dolores error.</p>
        </div> 
    </div>
  )
}

export default About