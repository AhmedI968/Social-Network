import { PrismaClient } from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/script';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { race, gender, sexuality, religion, bio } = req.body;

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const { id } = decodedToken;
    console.log(id);

    // first check if the user already exists in the userprofile table
    const userProfile = await prisma.userProfile.findUnique({
        where: { user_id: id },
    });

    // if the user does not exist, create a new userprofile in the database with the user id
    if (!userProfile) {
        try {
            const newUserProfile = await prisma.userProfile.create({
                data: { race, gender, sexuality, religion, bio, user_id: id },
            });
            res.status(201).json({ message: 'Profile created successfully' });
        } catch (error) {
            // if creation fails, return a 500 internal server error status with error message
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    } else {
        // try to update the userprofile in the database
        try {
            const updatedUserProfile = await prisma.userProfile.update({
                where: { user_id: id },
                data: { race, gender, sexuality, religion, bio },
            });

            // if update is successful, return a 200 ok status with success message
            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            // if update fails, return a 500 internal server error status with error message
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }

}