const axios = require('axios')
const API_REQUEST_ENDPOINT = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
export default async function handler(req, res) {

    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const data = JSON.parse(req.body)
    const auth = `Bearer ${data.access_token}`
    console.log('access token: ', data.access_token)

    try {
        const response = await axios.post(API_REQUEST_ENDPOINT, data.payload, {
            headers: {
                "Authorization": auth
            }
        })
        console.log('response: ',response)
        return res.status(200)
    }
    catch(error) {
        console.log('error: ', error.response.data)
        return res.status(400)
    }
}