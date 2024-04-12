import { prisma } from "../../lib/script";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Interest } from "@prisma/client";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // get token from request headers
    const token = req.headers.authorization?.split(' ')[1];

    // get the body of the request
    const { interests } = req.body;

    // if no token is provided, return a 401 unauthorized status
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // if no interests are provided, return a 400 bad request status
    if (!interests) {
        res.status(400).json({ message: 'No interests provided' });
        return;
    }

    // decode the token
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // get the user id from the decoded token
    const { id } = decodedToken;

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