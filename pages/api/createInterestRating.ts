import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

export default async function handle(req: NextApiRequest, res: NextApiResponse){
    const {ratingUserID, interestID, ratedUserID, new_score, scorecardID} = req.body;

    try {
        const newInterestRating = await prisma.interestRating.create({
            data: {
                rating_user_id: ratingUserID,
                interest_id: interestID,
                rated_user_id: ratedUserID,
                score: new_score,
                scorecard_id: scorecardID,
            },
        })

        return res.json({ newInterestRating })
    } catch (error){
        return res.status(500).json({ error: 'Failed to Create New Instance of InterestRating' })
    }
}