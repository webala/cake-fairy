import Image from "next/image"
import logo from "../public/logo.jpg"
import {MenuIcon, NewspaperIcon, InformationCircleIcon, BookOpenIcon,  PhoneIcon} from "@heroicons/react/outline"
import NavItem from "./NavItem"

function Header() {
  return (
    <header className="header flex items-center justify-between relative w-full py-10">
        <div className="flex items-center justify-between z-10">
            {/* <Image className="rounded-full" src={logo} width={50} height={50} layout="intrinsic"/> */}
            <h1 className="sm:text-2xl heading ml-2">Cake Fairy</h1>
        </div>
        {/* <MenuIcon className="h-5 sm:invisible z-10 right-10"/> */}
        <div className="nav-items invisible sm:visible flex absolute sm:right-10">
            <NavItem Icon={NewspaperIcon} text="Menu" />
            <NavItem Icon={BookOpenIcon} text="Services" />
            <NavItem Icon={InformationCircleIcon} text="About" />
            <NavItem Icon={PhoneIcon} text="Contact" />
        </div>
    </header>
  )
}

export default Header