import {MdOutlineStarRate} from 'react-icons/md'

function TestimonyItem({name, testimony, rating}) {
  return (
    <div className="bg-orange-900 m-2 rounded-md p-2 flex flex-col justify-between h-fit">
        <div className='flex flex-col sm:flex-row justify-between mb-5'>
          <h2>{name}</h2>
          <div className='flex'>
            {rating ===1 && <MdOutlineStarRate />}
            {rating ===2 && <div className='flex'><MdOutlineStarRate /><MdOutlineStarRate /></div>}
            {rating ===3 && <div className='flex'><MdOutlineStarRate /><MdOutlineStarRate /><MdOutlineStarRate /></div>}
            {rating ===4 && <div className='flex'><MdOutlineStarRate /><MdOutlineStarRate /><MdOutlineStarRate /><MdOutlineStarRate /></div>}
            {rating ===5 && <div className='flex'><MdOutlineStarRate /><MdOutlineStarRate /><MdOutlineStarRate /><MdOutlineStarRate /><MdOutlineStarRate /></div>}
          </div> 
        </div>
        <div>
            <p>{testimony}</p>
        </div>   
    </div>
  )
}

export default TestimonyItem