const axios = require("axios");
const ACCESS_TOKEN_URL =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;

//Handles fetching the access token
export default async function handler(req, res) {
  //Encode cunsumer key and customer secret to a base 64 string
  let buffer = new Buffer.from(consumer_key + ":" + consumer_secret);
  let auth = `Basic ${buffer.toString("base64")}`; //Create auth string from base64 encoded string

  //Only allow get request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await axios.get(ACCESS_TOKEN_URL, {
      headers: {
        Authorization: auth,
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
}
