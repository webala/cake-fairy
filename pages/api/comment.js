import prisma from "../../lib/prisma";

export async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log('Handler called')

    try {
      const savedComment = prisma.client_stories.creata({
        data,
      });
      return res.status(200).json(savedComment);
    } catch (error) {
      console.log("error: ", error.response.data);
      return res.status(400).json({ "message: ": "Something went wrong" });
    }
  }
}
