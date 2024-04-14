import { prisma } from '../../lib/script';

export const fetchAllInterests = async (user_id : string) => {
    try {

        const UserInterests = await prisma.userInterest.findMany({
            where: {user_id: user_id},
        });

        const interestsIds = UserInterests.map(interest => interest.interest_id)
        
        const interests = await prisma.interest.findMany({
            where: {interest_id: {in: interestsIds}},
            select: {interest_id: true, interest_name: true}
        });

        return interests;
        
    } catch (err) {
        console.error(err);
        throw new Error('There was an error fetching user');
    }
}