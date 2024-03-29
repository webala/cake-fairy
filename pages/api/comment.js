import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  console.log("Handler called");
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    try {
      const savedComment = await prisma.client_stories.create({
        data,
      });
      return res.status(200).json(savedComment);
    } catch (error) {
      console.log("error: ", error);
      return res.status(400).json({ "message: ": "Something went wrong" });
    }
  }

  if (req.method === "PATCH") {
    const data = JSON.parse(req.body);

    try {
      const updatedComment = await prisma.client_stories.update({
        where: {
          id: data.storyId,
        },
        data: data.storyData,
      });
      return res.status(200).json(updatedComment);
    } catch (error) {
      console.log("error: ", error);
      return res.status(400).json({ "message: ": "Something went wrong" });
    }
  }
}
