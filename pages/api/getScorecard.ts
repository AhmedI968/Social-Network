import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

// return scorecard based on user id passed in

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    }

    const scorecard = await prisma.scorecard.findFirst({
        where: {
            user_id: userId
        }
    });

    if (!scorecard) {
        res.status(404).json({ error: 'Scorecard not found' });
        return;
    }

    res.status(200).json(scorecard);
}

