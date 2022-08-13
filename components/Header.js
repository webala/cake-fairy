import Image from "next/image"
import logo from "../public/logo.jpg"
import {MenuIcon, NewspaperIcon, InformationCircleIcon, BookOpenIcon,  PhoneIcon} from "@heroicons/react/outline"
import NavItem from "./NavItem"
import landingImage from "../public/breads.jpg";


function Header() {
  return (
    <header className="header flex flex-col justify-between w-screen relative">
      <div className="header-img absolute top-0 w-full">
        <Image
            className="sm:w-full border border-black -z-10 w-screen opacity-30 rounded-lg"
            src={landingImage}
            layout="intrinsic"
          />
      </div>
      <div className="flex justify-between items-center py-10 px-2 font-bold">
        <div className="flex items-center justify-between z-10">
            {/* <Image className="rounded-full" src={logo} width={50} height={50} layout="intrinsic"/> */}
            <h1 className="text-2xl heading ml-2">Cake Fairy</h1>
        </div>
        {/* <MenuIcon className="h-5 sm:invisible z-10 right-10"/> */}
        <div className="nav-items invisible sm:visible flex absolute sm:right-10 text-xl">
            <NavItem Icon={NewspaperIcon} text="Menu" reference='menu'/>
            <NavItem Icon={BookOpenIcon} text="Services" reference='services'/>
            <NavItem Icon={InformationCircleIcon} text="About" reference='about'/>
            <NavItem Icon={PhoneIcon} text="Contact" reference='footer'/>
        </div>
      </div>
    </header>
  )
}

export default Header