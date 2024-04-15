import { prisma } from "../../lib/script";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // get username from header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const username = token

    // get the body of the request
    const { interests } = req.body;

    // if no username is provided, return a 400 bad request status
    if (!username) {
        res.status(400).json({ message: 'Unauthorized' });
        return;
    }

    // if no interests are provided, return a 400 bad request status
    if (!interests) {
        res.status(400).json({ message: 'No interests provided' });
        return;
    }

    // find user by username
    const user = await prisma.user.findUnique({
        where: { username: username }
    });

    // get the user id from the decoded token
    let id: any;

    if (user) {
        id = user.user_id;
    } else {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // delete all current interests of the user
    await prisma.userInterest.deleteMany({
        where: { user_id: id }
    });

    // create new user interests
   try {
        const updatedUserInterests = await Promise.all(interests.map(async (interest_id: string) => {
            const interest = await prisma.interest.findUnique({
                where: { interest_id: interest_id }
            });

            if (!interest) {
                throw new Error('Interest not found');
            }


            const userInterest = await prisma.userInterest.create({
                data: {
                    user_id: id,
                    interest_id: interest_id,
                    category_id: interest.category_id
                }
            });
            console.log('Interest', interest.interest_name, 'added', "category", interest.category_id);
            return userInterest;
        }));

        res.status(200).json({ message: 'Interests updated successfully' });
   } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
   }

}