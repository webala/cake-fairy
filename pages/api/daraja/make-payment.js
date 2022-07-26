const axios = require("axios");
const API_REQUEST_ENDPOINT =
  "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
const BUSINESS_SHORT_CODE = "174379";
const LIPANAMPESA_PASSKEY = process.env.LIPANAMPESA_PASSKEY;

const formatTime = () => {
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
  return timestamp;
};

const generatePassword = (formatedTime) => {
  let dataToEncode = (
    BUSINESS_SHORT_CODE +
    LIPANAMPESA_PASSKEY +
    formatedTime
  ).toString();
  let password = new Buffer.from(dataToEncode).toString("base64");
  return password;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  const auth = `Bearer ${data.access_token}`; //Create authorization string from the request body
  console.log("auth: ", auth);

  //Generate password immediately before request is sent to avoid wrong credentials error.
  //This is because the password string is generated using a timestamp which should be accurate
  const formatedTime = formatTime();
  const password = generatePassword(formatedTime);

  //Initialize timestamp and password
  data.payload.Password = password;
  data.payload.Timestamp = formatedTime;

  try {
    const response = await axios.post(API_REQUEST_ENDPOINT, data.payload, {
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
}
