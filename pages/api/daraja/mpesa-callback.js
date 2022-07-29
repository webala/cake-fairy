import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  let transactionDetails;

  if (req.method === "POST") {
    console.log("call back received");
    const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
    console.log('callback metadata: ', callbackMetadata)
    const amount = callbackMetadata.Item[0].Value;
    const receipt_number = callbackMetadata.Item[1].Value;
    const transaction_date = new Date(callbackMetadata.Item[3].Value);
    const phone_number = callbackMetadata.Item[4].Value.toString();

    transactionDetails = {
      amount,
      receipt_number,
      transaction_date,
      phone_number,
    };
    try {
      const savedTransaction = await prisma.transaction_details.create({
        data: transactionDetails,
      });
      console.log("saved transaction: ", savedTransaction);
      return res.status(200).json(savedTransaction);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}
