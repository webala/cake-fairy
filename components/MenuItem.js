import {useState} from 'react'
function MenuItem({category, pathname, setFlavoursSelected, flavorsSelected}) {

  const [flavours, setFlavours] = useState(category.flavours)
  

  if (pathname === '/order') {
    return (
    <div className="flex flex-col pt-7">
     <h1 className='my-6 '>0.5kg-{category.pFive} 1kg-{category.pFive} 1.5kg-{category.pFive} 2kg-{category.pFive} 2.5kg-{category.pFive}</h1>
          {flavours.map((flavour, index) => {

            return (<div key={index} className='flex flex-row my-2 cursor-pointer'>
              <p className='mx-10' onClick={() => setFlavoursSelected([...flavorsSelected, flavour.name])}>{flavour.name}</p>
            </div>)
          })}
    </div>
    )
  } else{
    return (
      <div className="flex flex-col sm:w-1/2 md:w-2/6 pt-7">
          <h1 className='my-6 '>0.5kg-{category.pFive} 1kg-{category.pFive} 1.5kg-{category.pFive} 2kg-{category.pFive} 2.5kg-{category.pFive}</h1>

          {flavours.map((flavour, index) => {
            return (
            <div key={index}>
              <p>{flavour.name}</p>
            </div>)
          })}
      </div>
    )
  }

}

export default MenuItem