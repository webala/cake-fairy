import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  

  if (req.method === "POST") {
    const request_id = req.body.Body.stkCallback.CheckoutRequestID
    const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
    console.log('request id: ', request_id)
    const amount = callbackMetadata.Item[0].Value;
    const receipt_number = callbackMetadata.Item[1].Value;
    const transaction_date = new Date(callbackMetadata.Item[3].Value);
    const phone_number = callbackMetadata.Item[4].Value.toString();

    const transactionDetails = {
      amount,
      receipt_number,
      transaction_date,
      phone_number,
      is_complete: true
    };

    try {
      const updatedTransaction = await prisma.transaction_details.update({
        where: {
          request_id
        },
        data: transactionDetails,
      });
      console.log("saved transaction: ", updatedTransaction);
      return res.status(200)
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}
