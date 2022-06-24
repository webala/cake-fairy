import MenuItem from "./MenuItem"

function Menu({categories, pathname}) {

  return (
    <div className="menu">
        <h1 className="text-2xl py-10 heading">Menu</h1>
        <div className="border-yellow-300">
            {categories.map((item, index) => {
              return <MenuItem category={item} key={index} pathname={pathname}/>
            })}
        </div>
    </div>
  )
}

export default Menu