const BUSINESS_SHORT_CODE = "174379";
const LIPANAMPESA_PASSKEY = process.env.LIPANAMPESA_PASSKEY;

const formatTime = () => {
  const Timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
  return Timestamp;
};

const generatePassword = (formatedTime) => {
  let dataToEncode = (
    BUSINESS_SHORT_CODE +
    LIPANAMPESA_PASSKEY +
    formatedTime
  ).toString();
  let password = new Buffer.from(dataToEncode).toString("base64");
  console.log('password: ', password)
  return password;
};

const inititateStkPush = async (phone, amount) => {
  const res = await fetch("/api/daraja/generate-token");
  let resData = await res.json();
  const access_token = resData.access_token;
  const formatedTime = formatTime();
  const password = generatePassword(formatedTime);

  console.log("formated Time: ", formatedTime);

  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: formatedTime,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1,
    PartyA: 254791055897,
    PartyB: "174379",
    PhoneNumber: 254791055897,
    CallBackURL: "https://posthere.io/5899-45a2-9e00",
    AccountReference: "Cake Fairy",
    TransactionDesc: "Make Payment for cake",
  };

  const data = {
    payload,
    access_token,
  };
  const response = await fetch("/api/daraja/make-payment", {
    method: "POST",
    body: JSON.stringify(data),
  });

  resData = await response.json();

  console.log("response: ", resData);
};

export default inititateStkPush;
