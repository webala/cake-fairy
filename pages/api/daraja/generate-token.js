const axios = require('axios')
export default async function handler(req, res) {
  const ACCESS_TOKEN_URL =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;

  let buffer = new Buffer.from(consumer_key+":"+consumer_secret)
  let auth = `Basic ${buffer.toString('base64')}`

  console.log('auth: ', auth)
  console.log('calling handler')
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    
    const response = await axios.get(ACCESS_TOKEN_URL, {
        headers: {
          'Authorization': auth
        },
      });

      console.log('response data: ',response.data)
      return response.data

  } catch(error) {
    console.log('error: ',error)
  }
}
