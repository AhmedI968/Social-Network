import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, lastName, email, username, password, location, age } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password,
                location,
                age
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}