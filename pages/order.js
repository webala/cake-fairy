import Menu from '../components/Menu'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {AiOutlineClose} from 'react-icons/ai'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function getServerSideProps (){
    const categories = await prisma.category_price.findMany({
      include: {
        flavour: true
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
    const [flavours, setFlavours] = useState(categories.flavour)
    const [flavorsSelected, setFlavoursSelected] = useState()
    const [size, setSize] = useState()
    const [clientName, setClientName] = useState()
    const [phone, setPhone] = useState()
    const [delivery, setDelivery] = useState()
    const [collectionDate, setCollectionDate] = useState()
    const [collectionTime, setCollectionTime] = useState()
    const [wording, setWording] = useState()
    const [preferences, setPreferences] = useState()
    const [addOns, setAddOns] = useState()

    const router = useRouter()
    const pathname = router.pathname
   // console.log("flaovursSelected:", flavorsSelected)

    const processOrder = async (e) => {
      e.preventDefault()
      console.log('flavoursSelected: ', flavorsSelected)
      const categoryId = flavorsSelected.categoryId
      const category = categories.find(category => category.id === categoryId)
      console.log(category.one)
      let order_total;

      if (size == 0.5) {
        order_total = category.pfive
      } else if (size == 1) {
        order_total = category.one
      }
      else if (size == 1.5) {
        order_total = category.onepfive
      }
      else if (size == 2) {
        order_total = category.two
      }
      else if (size == 2.5) {
        order_total = category.twopfive
      }else if (size == 3) {
        order_total = category.threepfive
      }
      

      const order = {
          client_name: clientName,
          client_phone: phone,
          collection_date: collectionDate,
          collection_time: collectionTime,
          order_total: order_total,
          delivery: delivery,
          order_item: {
            create: [{
              flavour_id: flavorsSelected.flavourId,
              size: size,
              wording: wording,
              preferences: preferences ? preferences: '',
            }]
          }
      }

      

      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(order)
      })

      if (!response.ok) {
        console.log(response.statusText)
        throw new Error(response.statusText)
      }

      return await response.json();
    }
    
    // const handleSubmit = async () => {
    //   const createOrder = await prisma.order.create({
    //     data: {
    //       client_name: clientName,
    //       client_phone: phone,
    //       collection_date: collectionDate,
    //       collection_time: collectionTime,
    //       order_total: 111,
    //       delivery: delivery,
    //       order_item: {
    //         create: {
    //           flavour_id: 1,
    //           size: size,
    //           wording: wording,
    //           specifications: preferences,
              
    //         }
    //       }
    //     }
    //   })
    // }

    return (
        <div className='order p-4'>
            <Menu categories={categories} flavorsSelected={flavorsSelected} className="" pathname={pathname} setFlavoursSelected={setFlavoursSelected}/>
            <form onSubmit={async (e) => {
              await processOrder(e)
            }}>
            <div className='cart'>
              <h1>Cart</h1>
              
               { flavorsSelected && <div className="my-4">
                  <div>
                    <p>{flavorsSelected.flavourName}</p>
                  </div> 
                  
                  <div className='flex justify-between w-2/6'>
                    <div className='flex items-center'>
                      <label className='mr-2'>0.5kg</label>
                      <input name='size' type='radio' value={0.5} onClick={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>1kg</label>
                      <input name='size' type='radio' value={1} onClick={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>1.5kg</label>
                      <input name='size' type='radio' value={1.5} onClick={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>2kg</label>
                      <input name='size' type='radio' value={2} onClick={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>2.5kg</label>
                      <input name='size' type='radio' value={2.5} onClick={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className='flex items-center'>
                      <label className='mr-2'>3kg</label>
                      <input name='size' type='radio' value={3} onClick={(e) => setSize(e.target.value)}/>
                    </div>
         
                  </div>
                </div>}
                
              
            </div>
            <div className='order-details'>
             
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Name</label>
                  <input name='name' type='text' placeholder='Jane Doe' required onChange={(e) => setClientName(e.target.value)}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Phone</label>
                  <input name='phone' type='text' placeholder='0700000000' required onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Would you like your cake delivered?</label>
                  <div className='flex'>
                    <div className='mx-4 flex items-center'>
                      <label className='mr-2'>Yes</label>
                      <input className='' name='delivery' type='radio' value={true} onClick={(e) => setDelivery(e.target.value)}/>
                    </div>
                    <div className='mx-4 flex items-center'>
                      <label className='mr-2'>I'll pick it up myself</label>
                      <input name='delivery' type='radio' value={false} onClick={(e) => setDelivery(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Pickup or delivery date</label>
                  <input name='date' type='date' required onChange={(e) => setCollectionDate(e.target.value)}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Time of delivery or collection</label>
                  <input name='time' type='text' placeholder='10am' required onChange={(e) => setCollectionTime(e.target.value)}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Wording on Cake(Not more thean 25 characters)</label>
                  <input name='wording' type='text' placeholder='Happy 16th' required onChange={(e) => setWording(e.target.value)}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Do you have any other preferences? eg color, decorations</label>
                  <textarea className='' name='preferences' type='text' placeholder='(optional)' onChange={(e) => setPreferences(e.target.value)}/>
                </div>
                <div className='flex flex-col items-start my-4'>
                  <label className='mr-2'>Would you like some add-ons?</label>
                  <div className='flex items-center'>
                    <label className='mx-2'>Cake toppers @300</label>
                    <input name='add-ons' type='radio' value='cake-toppers' onClick={(e) => setAddOns(e.target.value)}/>
                  </div>
                  <div className='flex items-center'>
                    <label className='mx-2'>Edible images @600</label>
                    <input name='add-ons' type='radio' value='edible-images' onClick={(e) => setAddOns(e.target.value)}/>
                  </div>
                  <div className='flex items-center'>
                    <label className='mx-2'>Sparkling candles @50</label>
                    <input name='add-ons' type='radio' value='sparkling-candles' onClick={(e) => setAddOns(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <button type='submit' className='rounded-md p-3 bg-orange-900'>Place order</button>
                </div>
            </div>
            </form>
        </div>
    )
}