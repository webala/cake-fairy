import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const updateData = JSON.parse(req.body);

    const updatedTransaction = await prisma.transaction_details.update({
      where: {
        id: updateData.transactionId,
      },
      data: updateData.transactionData,
    });

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
}
