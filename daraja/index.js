const BUSINESS_SHORT_CODE = "174379";

//Function to initiate STK push
const inititateStkPush = async (phone, amount) => {
  //Generate access token
  const res = await fetch("/api/daraja/generate-token");
  let resData = await res.json();
  const access_token = resData.access_token;

  //Set password and timestamp to null and initialize the parameters right before the request
  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: null,
    Timestamp: null,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1,
    PartyA: 254791055897,
    PartyB: "174379",
    PhoneNumber: 254791055897,
    CallBackURL: "https://posthere.io/b389-4526-bbbb",
    AccountReference: "Cake Fairy",
    TransactionDesc: "Make Payment for cake",
  };

  const data = {
    payload,
    access_token,
  };

  //send the payload and access token to api handler which handles the actual request
  //the api handler runs on the server
  const response = await fetch("/api/daraja/make-payment", {
    method: "POST",
    body: JSON.stringify(data),
  });

  resData = await response.json();

  console.log("response: ", resData);
};

export default inititateStkPush;
