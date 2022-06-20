function NavItem({Icon, text}) {
  return (
    <div className="flex mx-5 group flex-col">
        <Icon className="h-5 group-hover:animate-bounce transition duration-300" />
        <p className="opacity-0 group-hover:opacity-100">{text}</p>
    </div>
  )
}

export default NavItem