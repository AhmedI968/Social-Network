import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";
import bcrypt from "bcrypt";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, lastName, email, username, password, location, age } = req.body;
    console.log("creating user with information: ", firstName, lastName, email, username, password, location, age);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {

        // check if user already exists
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password: hashedPassword,
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