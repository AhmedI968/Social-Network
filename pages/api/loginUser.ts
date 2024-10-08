import bcrypt from 'bcrypt';// /pages/api/login.js
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/script';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
    }

    res.status(200).json({ user });
}