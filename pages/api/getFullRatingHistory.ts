import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/script'

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
    const user = await prisma.user.findUnique({
        where : { username : username },
        select : {
            WrittenFeedback: true,
            WrittenFeedback2: true,
            Scorecard: {
                select: {
                    cumulative_score: true,
                    last_updated: true,
                    CategoryRating: true,
                    InterestRating: true
                }
            },
            TwoWayRanking: true
        }
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // get all of the user's scorecards
    const scorecards = user.Scorecard;

    // prepare the result array
    const result = [];

    for (const scorecard of scorecards) {
        // find the user who gave the rating
        const ratingUserId = scorecard.CategoryRating[0].rating_user_id;

        const ratingUser = await prisma.user.findUnique({
            where: { user_id: ratingUserId },
        });

        if (!ratingUser) {
            res.status(404).json({ message: 'Rating user not found' });
            return;
        }

        // find the two way ranking that correlates to the rating user
        const twoWayRanking = user.TwoWayRanking.find(ranking => ranking.user2_id === ratingUserId);

        // get the category ratings and interest ratings
        const categoryRatings = await Promise.all(scorecard.CategoryRating.map(async (categoryRating) => {
            const category = await prisma.interestCategory.findUnique({
                where: { category_id: categoryRating.category_id }
            });
            return {
                category: category?.category_name,
                rating: categoryRating.score
            };
        }));
        
        const interestRatings = await Promise.all(scorecard.InterestRating.map(async (interestRating) => {
            const interest = await prisma.interest.findUnique({
                where: { interest_id: interestRating.interest_id }
            });
            return {
                interest: interest?.interest_name,
                rating: interestRating.score
            };
        }));

        const writtenFeedback = user.WrittenFeedback2.find(feedback => feedback.user_id === ratingUserId);
        const writtenFeedbackString = writtenFeedback?.feedback;

        result.push({
            ratingUser: ratingUser.username,
            lastUpdated: scorecard.last_updated,
            ratingReceived: twoWayRanking?.score_1,
            ratingGiven: twoWayRanking?.score_2,
            categoryRatings,
            interestRatings,
            writtenFeedback: writtenFeedbackString
        });
    }

    console.log("this is the result", result)
    res.status(200).json(result);
    
}