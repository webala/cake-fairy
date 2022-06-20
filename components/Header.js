import Image from "next/image"
import logo from "../public/logo.jpg"
import {MenuIcon, NewspaperIcon, InformationCircleIcon, BookOpenIcon,  PhoneIcon} from "@heroicons/react/outline"
import NavItem from "./NavItem"

function Header() {
  return (
    <header className="flex p-5 items-center justify-between">
        <div className="flex flex-row items-center justify-between">
            <Image className="rounded-full" src={logo} width={100} height={100} layour="raw"/>
            <h1 className="ml-5 text-2xl">Sheila Bakery</h1>
        </div>
        <MenuIcon className="h-5 sm:invisible"/>
        <div className="nav-items invisible sm:visible flex">
            <NavItem Icon={NewspaperIcon} text="Menu" />
            <NavItem Icon={BookOpenIcon} text="Services" />
            <NavItem Icon={InformationCircleIcon} text="About" />
            <NavItem Icon={PhoneIcon} text="Contact" />
        </div>
    </header>
  )
}

export default Header