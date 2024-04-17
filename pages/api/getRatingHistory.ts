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
    const scorecards = user.Scorecard;

    // prepare the result array
    const result = [];

    // iterate through all the scorecards
    for (const scorecard of scorecards) {

        console.log("from getRatingHistory", scorecard)

        // take one category rating in the scorecard and get user who gave the rating
        const ratingUserId = scorecard.CategoryRating[0].rating_user_id;

        // find the user who gave the rating by id
        const ratingUser = await prisma.user.findUnique({
            where: { user_id: ratingUserId }
        });

        if (!ratingUser) {
            res.status(404).json({ message: 'Rating user not found' });
            return;
        }

        // check if there is a written feedback from the rating user to the rated user
        let hasWrittenFeedback = false;
        for (const feedback of user.WrittenFeedback) {
            if (feedback.written_user_id === ratingUserId) {
                hasWrittenFeedback = true;
                break;
            }
        }

        // push the result to the result array
        result.push({
            ratingUser: ratingUser.username,
            lastUpdated: scorecard.last_updated,
            rating: scorecard.cumulative_score,
            hasWrittenFeedback: hasWrittenFeedback
        });
    }

    console.log("this is the result", result)
    res.status(200).json(result);
    
}