import { prisma } from '../../lib/script';

export const retrieveUser = async (user_id: string) => {
    try {
        const user = await prisma.user.findMany({
            where: { user_id: user_id },
        });
        return user;
    }
    catch (err) {
        console.error(err);
        throw new Error('There was an error fetching user');
    }

}

