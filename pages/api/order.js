// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/prisma'

export default async function handler(req, res) {

  //console.log('handler called')
  if(req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'})
  }

  try {
    const {order} = req.body
    console.log(order)
    const savedOrder = await prisma.order.create({
      data: order
    })

    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(400).json({message: 'Something went wrong'})
  }

}
