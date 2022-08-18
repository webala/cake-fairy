import prisma from "../../lib/prisma"

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(400).json({message : 'method not allowed'})
    }

    try {
        const data = JSON.parse(req.body)
        const savedTransaction = prisma.transaction_details.create({
            data
        })
        return res.status(200).json(savedTransaction)
    }  catch(error) {
        console.log('Error: ', error)
        return res.status(400).json({message : 'something went wrong'})
    }
}