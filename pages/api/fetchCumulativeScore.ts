import { prisma } from '../../lib/script';

export const retrieveCumulativeScore = async function (user_id: string) {
    const score = await prisma.scorecard.findMany({
        where: { user_id: user_id },
    });

    return score.map((s) => s.cumulative_score);
}
