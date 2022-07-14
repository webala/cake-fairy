import {useState} from 'react'

function Testify() {
    const[testimony, setTestimony] = useState()
    const[name, setName] = useState()
  return (
    <div className="py-10">
        <form>
            <div className='flex flex-col items-center'>
                <label className='text-xl mx-5 mt-5 heading'>Share your experience with Cake Fairy</label>
                <div className='flex flex-col sm:w-1/2 items-center pt-10'>
                  <label className='text-xl mx-5 mt-5 top-0 left-10'>Your Name</label>
                  <input className='rounded h-10 m-5 w-1/2' type='text' onChange={(e) => setTestimony(e.target.value)}/>
                  <textarea className='rounded h-20 sm:h-40 m-5 w-full' type='text' onChange={(e) => setName(e.target.value)}/>
                  <button className='rounded bg-orange-900 sm:w-1/2 p-2 hover:scale-110 transition duration-300' type='submit'>Leave Comment</button>
                </div>
                
            </div>
        </form>
    </div>
  )
}

export default Testify