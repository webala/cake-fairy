import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(400).json({message : 'method not allowed'})
    }

    try {
        console.log('Handler called')
        const data = JSON.parse(req.body)
        console.log('transaction data: ', data)
        const savedTransaction = await prisma.transaction_details.create({
            data
        })
        console.log('saved transaction: ', savedTransaction)
        return res.status(200).json(savedTransaction)
    }  catch(error) {
        console.log('Error: ', error)
        return res.status(400).json({message : 'something went wrong'})
    }
}