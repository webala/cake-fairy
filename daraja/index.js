const base64 = require("base-64");
const ACCESS_TOKEN_URL =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;

const generateToken = () => {
  // const headers = new Headers()
  // headers.set("Authorization", "Basic " + base64.encode(consumer_key + ":" + consumer_secret))
  const response = fetch('/api/daraja/generate-token');

  

  return response;
};

const access_token = generateToken();
console.log("access token: ", access_token);

const inititateStkPush = () => {
  const access_token = generateToken();
  console.log("access token: ", access_token);
};

export default inititateStkPush;
