import MenuItem from "./MenuItem"

function Menu({categories, pathname, setFlavoursSelected, flavorsSelected}) {

  return (
    <div className="menu">
        <h1 className="text-2xl py-10 heading">Menu</h1>
        <div className="border-yellow-300">
            {categories.map((item, index) => {
              return <MenuItem category={item} key={index} pathname={pathname} setFlavoursSelected={setFlavoursSelected} flavorsSelected={flavorsSelected}/>
            })}
        </div>
    </div>
  )
}

export default Menu