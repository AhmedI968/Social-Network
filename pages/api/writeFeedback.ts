import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/script";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
    const usernameWhoIsWriting = authHeader?.split(" ")[1];
    const usernameWhoIsReceiving = authHeader?.split(" ")[2];
    const feedback = req.body.feedback;

    const userWhoIsWriting = await prisma.user.findUnique({ where: { username: usernameWhoIsWriting } });
    const userWhoIsReceiving = await prisma.user.findUnique({ where: { username: usernameWhoIsReceiving } });

    if (!userWhoIsWriting || !userWhoIsReceiving) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const feedbackWritten = await prisma.writtenFeedback.create({
        data: {
            feedback: feedback,
            user_id: userWhoIsWriting.user_id,
            written_user_id: userWhoIsReceiving.user_id
        }
    });

    if (feedbackWritten) {
        res.status(200).json({ message: "Feedback submitted successfully" });
    } else {
        res.status(500).json({ message: "Failed to submit feedback" });
    }
}