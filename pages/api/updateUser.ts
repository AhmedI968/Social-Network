"use server";
import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/script';
import { redirect } from 'next/navigation';


export const updateUser = async (formData: FormData) => {
    const { user_id, username, first_name, last_name, email, password, location, age } = Object.fromEntries(formData);
    try {
        const updateFields: { [key: string]: string | number } = {
            username: "" + username.toString(),
            first_name: "" + first_name.toString(),
            last_name: "" + last_name.toString(),
            email: "" + email.toString(),
            password: "" + password.toString(),
            location: "" + location.toString(),
            age: parseInt(age.toString()) // Convert age to number
        };

        Object.keys(updateFields).forEach(key => {
            (updateFields[key] === "" || undefined) && delete updateFields[key];
        });

        await prisma.user.update({
            where: { user_id: user_id.toString() }, // Convert user_id to string
            data: updateFields
        });

    } catch (err) {
        console.error(err);
        throw new Error('There was an error updating the user');
    }

    revalidatePath('/api/fetchUser');
    redirect('/profile');

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

