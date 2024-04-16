import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized header" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const username = token;
    console.log(username, "this is the username, sent from get user interests name api");

    if (!username) {
        res.status(400).json({ message: "Unauthorized username" });
        return;
    }

    // find user by username
    const currentUser = await prisma.user.findUnique({ 
        where: { username: username },
        include: { UserInterest: true }
    });

    if (!currentUser) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    // get the user's interests and what categories they belong to
    const userInterests = await Promise.all(currentUser.UserInterest.map(async (interest) => {
        const userInterest = await prisma.interest.findUnique({
            where: { interest_id: interest.interest_id },
        });
        const userInterestCategory = await prisma.interestCategory.findUnique({
            where: { category_id: interest.category_id },
        });

        return {
            interest_name: userInterest?.interest_name,
            category_name: userInterestCategory?.category_name,
        };
    }));

    console.log(userInterests, "this is the interest");
    res.status(200).json(userInterests);
}