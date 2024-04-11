import { prisma } from '../../lib/script';

export const fetchAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (err) {
        console.error(err);
        throw new Error('There was an error fetching users');
    }
};