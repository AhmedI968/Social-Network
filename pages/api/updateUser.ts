"use server";
import { prisma } from '../../lib/script';


export const updateUser = async (formData: FormData) => {
    const { user_id, username, first_name, last_name, email, password, location, age } = Object.fromEntries(formData);
    try {
        const updateFields = {
            username: username.toString(),
            first_name: first_name.toString(),
            last_name: last_name.toString(),
            email: email.toString(),
            password: password.toString(),
            location: location.toString(),
            age: parseInt(age.toString()) // Convert age to number
        };

        await prisma.user.update({
            where: { user_id: user_id.toString() },
            data: updateFields
        });
    }
    catch (err) {
        console.error(err);
        throw new Error('There was an error updating the user');
    }
}
// export const updateUser = async (formData) => {
//     const { user_id, username, first_name, last_name, email, password, location, age } = Object.fromEntries(formData);
//     try {
//         const updateFields = {
//             username,
//             first_name,
//             last_name,
//             email,
//             password,
//             location,
//             age
//         };

//         await prisma.user.update({
//             where: { user_id },
//             data: updateFields
//         });
//     }
//     catch (err) {
//         console.error(err);
//         throw new Error('There was an error fetching user');
//     }

// }

