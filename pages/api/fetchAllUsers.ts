import { prisma } from '../../lib/script';
import { NextApiRequest, NextApiResponse } from 'next';
/*
export const fetchAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (err) {
        console.error(err);
        throw new Error('There was an error fetching users');
    }
};
*/

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
}