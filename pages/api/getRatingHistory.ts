import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/script'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    // get user information from the header
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
        }
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // fetch all usermatch objects where the current user is either user1 or user2
    const userMatches = await prisma.userMatch.findMany({
        where: {
            OR: [
                { user1_id: user.user_id },
                { user2_id: user.user_id }
            ]
        },
        include: {
            user1: true,
            user2: true,
        }
    });

    const ratingHistory = [];

    for (const match of userMatches) {
        // determine the matched user
        const matchedUser = match.user1.user_id === user.user_id ? match.user2 : match.user1;

        // fetch the scorecard where the current user is the rating user and the matched user is the rated user
        const givenScorecard = await prisma.scorecard.findFirst({
            where: {
                rating_user_id: user.user_id,
                rated_user_id: matchedUser.user_id
            }
        });

        // fetch the scorecard where the matched user is the rating user and the current user is the rated user
        const receivedScorecard = await prisma.scorecard.findFirst({
            where: {
                rating_user_id: matchedUser.user_id,
                rated_user_id: user.user_id
            }
        });

        // determine the status of the feedback
        let feedbackReceived = false;

        // check if the current user has written feedback for the matched user
        const writtenFeedback = user.WrittenFeedback.find(feedback => feedback.written_user_id === matchedUser.user_id);

        // combine the data into the object to be returned
        ratingHistory.push({
            matchedUser: matchedUser.username,
            matchedAt: match.matchedAt,
            ratingGiven: givenScorecard?.cumulative_score || 0,
            ratingReceived: receivedScorecard?.cumulative_score || 0,
            feedbackReceived: !!receivedScorecard,
            writtenFeedback: writtenFeedback ? writtenFeedback.user_id : ''
        });
    }


    console.log("this is the result", ratingHistory)
    res.status(200).json(ratingHistory);
    
}