import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const username = token;

    if (!username) {
        res.status(400).json({ message: "Unauthorized" });
        return;
    }

    // find user by username
    const currentUser = await prisma.user.findUnique({ 
        where: { username: username },
        include: { UserInterest: true }
    });

    if (!currentUser) {
        res.status(404).json({ message: "Unauthorized" });
        return;
    }

    // fetch all users and their interests
    const allUsers = await prisma.user.findMany({
        include: { UserInterest: true }
    });

    // filter out the users that share at least 3 interests with the current user
    const matches = allUsers.filter(user => {
        // get the interest of the current user and the other user
        const currentUserInterests = currentUser.UserInterest.map(interest => interest.interest_id);
        const otherUserInterests = user.UserInterest.map(interest => interest.interest_id);

        // find the common interests
        const commonInterests = currentUserInterests.filter(interest => otherUserInterests.includes(interest));

        // if the common interests are more than 3, then it is a match
        return commonInterests.length >= 3;
    });

    if (matches.length === 0) {
        res.status(404).json("Match not found");
        return;
    }

    res.status(200).json(matches[0].username);
}