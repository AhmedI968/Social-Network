'use server';
import { signIn } from './auth';
export const authenticate = async (formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn('credentials', { username, password });
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}