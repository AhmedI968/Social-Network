import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const register = async (formData) => {
    const { firstName, lastName, email, username, password, location, age } = Object.fromEntries(formData);

    try {
        // do it as prisma
        const user = await prisma.user.create({
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

    }

    catch {
        alert("Error creating user");
    }
};