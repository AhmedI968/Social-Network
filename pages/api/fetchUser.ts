import { prisma } from '../../lib/script';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
}

