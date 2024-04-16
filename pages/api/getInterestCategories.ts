import { prisma } from "../../lib/script";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const interestCategories = await prisma.interestCategory.findMany({
        include: {
            interests: true,
        },
    });
    res.status(200).json(interestCategories);
}