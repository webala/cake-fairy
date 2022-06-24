import {useState} from 'react'
function MenuItem({category}) {

  const [flavours, setFlavours] = useState(category.flavours)
  return (
    <div className="flex flex-col sm:w-1/2 md:w-2/6 pt-7">
        <h1 className='my-6 '>0.5kg-{category.pFive} 1kg-{category.pFive} 1.5kg-{category.pFive} 2kg-{category.pFive} 2.5kg-{category.pFive}</h1>
        {flavours.map((flavour, index) => {
          return (<p key={index}>{flavour.name}</p>)
        })}
    </div>
  )
}

export default MenuItem