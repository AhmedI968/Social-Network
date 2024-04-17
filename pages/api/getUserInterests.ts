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
        res.status(404).json({ message: "User not found" });
        return;
    }

    console.log(currentUser.UserInterest, "this is the interest");
    res.status(200).json(currentUser.UserInterest);
}