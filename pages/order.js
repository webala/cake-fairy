import Menu from '../components/Menu'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
    const router = useRouter()
    const pathname = router.pathname
    return (
        <div className='order p-4'>
            <Menu categories={categories}  className="" pathname={pathname}/>
        </div>
    )
}