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
            user_id: true,
            WrittenFeedback: {
                select: {
                    written_user_id: true,
                    user_id: true
                }
            },
            Scorecard: {
                select: {
                    cumulative_score: true,
                    last_updated: true,
                    CategoryRating: {
                        select: {
                            rating_user_id: true,
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // get all of the user's scorecards
    const scorecards = await prisma.scorecard.findMany({
        include: {
            CategoryRating: true
        }
    });

    // prepare the result array
    const result = [];

    // iterate through all the scorecards
    for (const scorecard of scorecards) {

        // find who gave the rating
        const ratingUserId = scorecard.CategoryRating[0].rating_user_id;
        const ratedUserId = scorecard.CategoryRating[0].rated_user_id;

        // if the user is the one who gave the rating
        if (user.user_id === ratingUserId) {
            let hasWrittenFeedback = false;

            // check if the user has written feedback for the rated user
            for (const feedback of user.WrittenFeedback) {
                if (feedback.written_user_id === scorecard.CategoryRating[0].rated_user_id) {
                    hasWrittenFeedback = true;
                    break;
                }
            }

            // find the user who the recevied the rating
            const ratedUser = await prisma.user.findUnique({
                where: { user_id: ratedUserId }
            });

            result.push({
                ratingUser: ratedUser?.username,
                hasWrittenFeedback: hasWrittenFeedback,
                lastUpdated: "N/A",
                rating: "N/A"
            });
        } else if (user.user_id === ratedUserId) {
            // if the user is the one who received the rating
            let hasWrittenFeedback = false;

            // check if the user has written feedback for the rated user
            for (const feedback of user.WrittenFeedback) {
                if (feedback.written_user_id === scorecard.CategoryRating[0].rating_user_id) {
                    hasWrittenFeedback = true;
                    break;
                }
            }

            // find the user who the gave the rating
            const ratingUser = await prisma.user.findUnique({
                where: { user_id: ratingUserId }
            });

            result.push({
                ratingUser: ratingUser?.username,
                hasWrittenFeedback: hasWrittenFeedback,
                lastUpdated: scorecard.last_updated,
                rating: scorecard.cumulative_score
            });
        } else {
            continue;
        }
    }

    console.log("this is the result", result)
    res.status(200).json(result);
    
}