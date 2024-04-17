import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = new PrismaClient();

// call setup to populate the database with initial data
export async function setup() {
    await prisma.interestCategory.createMany({
        data: [
            {
                category_id: '1',
                category_name: 'Sports',
            },
            {
                category_id: '2',
                category_name: 'Games',
            },
            {
                category_id: '3',
                category_name: 'Creative',
            }
        ]
    });

    await prisma.interest.createMany({
        data: [
            {
                interest_name: 'Football',
                category_id: '1'
            },
            {
                interest_name: 'Basketball',
                category_id: '1'
            },
            {
                interest_name: 'Tennis',
                category_id: '1'
            },
            {
                interest_name: 'Chess',
                category_id: '2'
            },
            {
                interest_name: 'Poker',
                category_id: '2'
            },
            {
                interest_name: 'Drawing',
                category_id: '3'
            },
            {
                interest_name: 'Painting',
                category_id: '3'
            },
        ]
    });
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;

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

