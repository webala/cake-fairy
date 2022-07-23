const axios = require('axios')
export default async function handler(req, res) {
  const ACCESS_TOKEN_URL =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;

  let buffer = new Buffer.from(consumer_key+":"+consumer_secret)
  let auth = `Basic ${buffer.toString('base64')}`

  
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    
    const response = await axios.get(ACCESS_TOKEN_URL, {
        headers: {
          'Authorization': auth
        },
      });

      return res.status(200).json({access_token: response.data.access_token})

  } catch(error) {
    console.log('error: ',error)
    return res.status(400).json({message: 'Something went wrong'})
  }
}
