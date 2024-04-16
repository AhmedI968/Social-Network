import { prisma } from '../../lib/script';

export const fetchUser = async (id: any) => {
    const user = await prisma.user.findUnique({
        where: {
            user_id: id
        }
    });
    return user;
}


