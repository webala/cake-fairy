import Image from "next/image"
import logo from "../public/logo.jpg"
import { MenuIcon, NewspaperIcon, InformationCircleIcon, BookOpenIcon, PhoneIcon } from "@heroicons/react/outline"
import NavItem from "./NavItem"
import landingImage from "../public/breads.jpg";


function Header() {
  return (
    <header className="flex justify-between w-full items-center py-10 px-4 md:px-20 xl:px-64 font-bold bg-backgroundSecondary">
      <div className="flex items-center justify-between z-10">
        {/* <Image className="rounded-full" src={logo} width={50} height={50} layout="intrinsic"/> */}
        <h1 className="text-2xl heading ml-2">Cake Fairy</h1>
      </div>
      {/* <MenuIcon className="h-5 sm:invisible z-10 right-10"/> */}
      <div className="nav-items invisible sm:visible flex text-xl md:mr-20">
        <NavItem Icon={NewspaperIcon} text="Menu" reference='menu' />
        <NavItem Icon={BookOpenIcon} text="Services" reference='services' />
        <NavItem Icon={InformationCircleIcon} text="About" reference='about' />
        <NavItem Icon={PhoneIcon} text="Contact" reference='footer' />
      </div>
    </header>
  )
}

export default Header