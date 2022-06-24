import {useState} from 'react'

function Testify() {
    const[testimony, setTestimony] = useState()
  return (
    <div className="py-10">
        <form>
            <div className='flex flex-col items-center'>
                <label className='text-xl mx-5 mt-5'>Share your experience with Cake Fairy</label>
                <input className='rounded h-10 m-5' type='text' onChange={(e) => setTestimony(e.target.value)} />
                <button className='rounded bg-orange-900 w-1/2 p-2 hover:scale-110 transition duration-300' type='submit'>Leave Comment</button>
            </div>
        </form>
    </div>
  )
}

export default Testify