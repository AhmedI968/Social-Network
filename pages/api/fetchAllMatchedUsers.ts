import { prisma } from '../../lib/script';

export const fetchAllMatchedUsers = async (user_id : string) => {
    try {

        const matchedUsers1 = await prisma.userRates.findMany({
            where: {user1_id: user_id},
        });
        const matchedUsers2 = await prisma.userRates.findMany({
            where: {user2_id: user_id},
        });

        const combinedIds: { rating_id: string; user_id: string; }[] = [];

        matchedUsers1.forEach(({ rating_id, user2_id }) => {
            combinedIds.push({ rating_id, user_id: user2_id });
        });
        
        matchedUsers2.forEach(({ rating_id, user1_id }) => {
            combinedIds.push({ rating_id, user_id: user1_id });
        });
        
        return combinedIds;
    } catch (err) {
        console.error(err);
        throw new Error('There was an error fetching the data');
    }
}