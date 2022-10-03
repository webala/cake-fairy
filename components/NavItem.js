function NavItem({Icon, text, reference}) {
  return (
    <a href={`#${reference}`}>
      <div className="flex mx-5 group flex-col">
          <Icon className="text-2xl h-7 group-hover:animate-bounce transition duration-300 group-hover:cursor-pointer" />
          <p>{text}</p>
      </div>
    </a>
  )
}

export default NavItem