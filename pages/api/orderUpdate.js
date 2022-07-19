import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const updateData = JSON.parse(req.body)

    const updatedOrder = await prisma.order.update({
        where: {
            id: updateData.orderId
        },
        data: updateData.orderData
    })

    res.status(200).json(updatedOrder)

  } catch(error) {
    res.status(400).json({message: "Something went wrong"})
  }
}
