import { prisma } from '../../lib/script';

export const fetchAllMatchedUsers = async (user_id : string) => {
    try {

        const matchedUsers1 = await prisma.userRates.findMany({
            where: {user1_id: user_id},
        });
        const matchedUsers2 = await prisma.userRates.findMany({
            where: {user2_id: user_id},
        });

        const matchedUsers = [...matchedUsers1, ...matchedUsers2]

        const user1Ids = matchedUsers.map(user => user.user1_id)
        const user2Ids = matchedUsers.map(user => user.user2_id)

        const combinedIds = [...user1Ids, ...user2Ids]
        
        return combinedIds;
    } catch (err) {
        console.error(err);
        throw new Error('There was an error fetching the data');
    }
}