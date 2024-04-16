import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/script';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const username = token;

    if (!username) {
        res.status(400).json({ message: 'Unauthorized' });
        return;
    }

    // find user by username
    const userWithScorecard = await prisma.user.findUnique({
        where: { username: username },
        select: { Scorecard: true }
    });

    if (!userWithScorecard || !userWithScorecard.Scorecard || userWithScorecard.Scorecard.length === 0) {
        res.status(404).json({ message: 'Scorecard not found' });
        return;
    }


    // get all of the user's scorecards
    const scorecards = userWithScorecard.Scorecard;

    // calculate the average of the cumulative scores of the scorecard
    const totalScore = scorecards.reduce((acc, score) => acc + score.cumulative_score, 0);
    const averageScore = totalScore / scorecards.length;

    res.status(200).json({ score: averageScore });

}
