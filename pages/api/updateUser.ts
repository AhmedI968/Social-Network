import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

export default async function updateUser(userData: any, user_id: any) {
    try {
        await prisma.user.update({
            where: { user_id },
            data: userData,
        });
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
    return { message: "Profile updated successfully" };

}