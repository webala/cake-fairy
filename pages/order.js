import Menu from '../components/Menu'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {AiOutlineClose} from 'react-icons/ai'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function getServerSideProps (){
    const categories = await prisma.category.findMany({
      include: {
        flavours: true
      }
    })
    
    return {
      props: {
        categories: categories,
      }
    }
  }

export default function Order (props) {

    const [categories, setCategories] = useState(props.categories)
    const [flavorsSelected, setFlavoursSelected] = useState([])
    const [orderItem, setOrderItem] = useState([])

    const router = useRouter()
    const pathname = router.pathname

    

    return (
        <div className='order p-4'>
            <Menu categories={categories} flavorsSelected={flavorsSelected} className="" pathname={pathname} setFlavoursSelected={setFlavoursSelected}/>
            <div className='cart'>
              <h1>Cart</h1>
              {flavorsSelected.map((item, index) => {
                return (
                <div key={index} className="my-4">
                  <div>
                    <p>{item}</p>
                  </div> 
                  
                  <div className='flex justify-between w-2/6'>
                    <div className='flex items-center'>
                      <label className='mr-2'>0.5kg</label>
                      <input name={`${item}-size`} type='radio' value={0.5}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>1kg</label>
                      <input name={`${item}-size`} type='radio' value={1}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>1.5kg</label>
                      <input name={`${item}-size`} type='radio' value={1.5}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>2kg</label>
                      <input name={`${item}-size`} type='radio' value={2}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>2.5kg</label>
                      <input name={`${item}-size`} type='radio' value={2.5}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>3kg</label>
                      <input name={`${item}-size`} type='radio' value={3}/>
                    </div>
         
                  </div>
                </div>
                )
              })}
            </div>
            <div className='order-details'>
              <form>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Name</label>
                  <input name='name' type='text'/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Phone</label>
                  <input name='name' type='text' value={3}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Would you like your cake delivered?</label>
                  <div className='flex'>
                    <div className='mx-4 flex items-center'>
                      <label className='mr-2'>Yes</label>
                      <input className='' name='delivery' type='radio' value={true}/>
                    </div>
                    <div className='mx-4 flex items-center'>
                      <label className='mr-2'>I'll pick it up myself</label>
                      <input name='delivery' type='radio' value={false}/>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Pickup or delivery date</label>
                  <input name='date' type='date'/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Time of delivery or collection</label>
                  <input name='time' type='text' value={3}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Wording on Cake(Not more thean 25 characters)</label>
                  <input name='wording' type='text' value={3}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Do you have any other preferences? eg color, decorations</label>
                  <textarea className='' name='preferences' type='text' value={3}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Would you like some add-ons?</label>
                  <div className='flex items-center'>
                    <label className='mx-2'>Cake toppers @300</label>
                    <input name='add-ons' type='checkbox' value='cake-toppers'/>
                  </div>
                  <div className='flex items-center'>
                    <label className='mx-2'>Edible images @600</label>
                    <input name='add-ons' type='checkbox' value='edible-images'/>
                  </div>
                  <div className='flex items-center'>
                    <label className='mx-2'>Sparkling candles @50</label>
                    <input name='add-ons' type='checkbox' value='sparkling-candles'/>
                  </div>
                </div>
                <div>
                  <button type='submit' className='rounded-md p-3 bg-orange-900'>Place order</button>
                </div>
              </form>

            </div>
        </div>
    )
}