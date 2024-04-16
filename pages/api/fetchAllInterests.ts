import { prisma } from '../../lib/script';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    console.log('Fetching all interests...');
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
        where: { username: username},
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // find userinterests that are tied to the user
    const userInterests = await prisma.userInterest.findMany({
        where: { user_id: user.user_id },
    });

    // for every userinterest, find the interest object and the category object, all by id
    const interests = await Promise.all(userInterests.map(async (userInterest) => {
            const interest = await prisma.interest.findUnique({
                where: { interest_id: userInterest.interest_id },
            });
            const category = await prisma.interestCategory.findUnique({
                where: { category_id: userInterest.category_id },
            });

            return {
                interest_name: interest?.interest_name,
                category_name: category?.category_name,
            };
        })
    );

    console.log(interests);
    res.status(200).json(interests);
}