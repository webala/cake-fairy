import {useState} from 'react'
function MenuItem({category, pathname, setFlavoursSelected, flavorsSelected}) {

  const [flavours, setFlavours] = useState(category.flavour)
  

  if (pathname === '/order') {
    return (
    <div className="flex flex-col pt-7">
     <h1 className='my-6 heading'>0.5kg- ksh{category.pfive} 1kg- ksh{category.one} 1.5kg- ksh{category.onepfive} 2kg- ksh{category.two} 2.5kg- ksh{category.twopfive} 3kg- ksh{category.three}</h1>
          {flavours.map((flavour, index) => {
            return (<div key={index} className='flex flex-row my-2 cursor-pointer'>
              <p className='mx-10' onClick={() => setFlavoursSelected( {flavourName: flavour.name, categoryId: flavour.category_id, flavourId: flavour.id})}>{flavour.name}</p>
            </div>)
          })}
    </div>
    )
  } else{
    return (
    <div className="flex flex-col pt-7">
          <h1 className='my-6 heading'>
            0.5kg-<span className="text-stone-50 mr-2">ksh{category.pfive}</span>
            1kg-<span className="text-stone-50 mr-2">ksh{category.one}</span> 
            1.5kg-<span className="text-stone-50 mr-2">ksh{category.onepfive}</span> 
            2kg-<span className="text-stone-50 mr-2">ksh{category.two}</span> 
            2.5kg-<span className="text-stone-50 mr-2">ksh{category.twopfive}</span> 
            3kg-<span className="text-stone-50 mr-2">ksh{category.three}</span>
          </h1>
          {flavours.map((flavour, index) => {
            return (
            <div key={index} className='flavours'>
              <p className='sm:text-lg'>{flavour.name}</p>
            </div>)
          })}
      </div>
    )
  }

}

export default MenuItem