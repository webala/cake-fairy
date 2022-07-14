import Image from "next/image"
import birthday from "../public/birthday.jpg";
function About() {
  return (
    <div className="about flex flex-col ">
        <h1 className="text-2xl heading">About me</h1>
        <div className=" flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-10">
            <Image className="rounded-full" src={birthday} layout='responsive' width={100} height={100}/>
          </div>
          <p className="md:w-1/2 text-xl pt-5 sm:p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor omnis aliquid, aspernatur obcaecati nam vel totam maxime a molestiae mollitia itaque voluptates iste, perferendis aperiam. Praesentium sunt voluptate dolores error.</p>
        </div> 
    </div>
  )
}

export default About