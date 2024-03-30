import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create new user
export async function createUser(userData: any) {
    const newUser = await prisma.user.create({
        data: {
            ...userData
        }
    });
    return newUser;
}
// ....

// get all users
export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}

export async function deleteAllUsers() {
    const users = await prisma.user.deleteMany();
    return users;
}
// ...

