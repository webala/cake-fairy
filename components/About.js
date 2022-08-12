import Image from "next/image"
import birthday from "../public/birthday.jpg";
function About() {
  return (
    <div className="about flex flex-col px-4 md:px-20 xl:px-44" id="about">
        <h1 className="text-2xl heading">About me</h1>
        <div className=" flex flex-col md:flex-row items-center">
          <div className="w-2/3 md:w-1/2 p-10">
            <Image className="rounded-full" src={birthday} layout='responsive' width={100} height={100}/>
          </div>
          <p className="md:w-1/2 text-xl sm:text-2xl pt-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor omnis aliquid, aspernatur obcaecati nam vel totam maxime a molestiae mollitia itaque voluptates iste, perferendis aperiam. Praesentium sunt voluptate dolores error.</p>
        </div> 
    </div>
  )
}

export default About