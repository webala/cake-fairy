import MenuItem from "./MenuItem"

function Menu({categories,flavours}) {

  

  
  return (
    <div className="sm:m-10 p-10">
        <h1 className="text-2xl py-10">Meu</h1>
        <div className="divide-y border-yellow-300">
            {categories.map((item, index) => {
              return <MenuItem category={item} key={index} />
            })}
        </div>
    </div>
  )
}

export default Menu