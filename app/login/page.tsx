// Login Page
"use client";

import styles from '../page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: any) => {
        event.preventDefault();
        const result = await signIn('credentials', {
            username,
            password,
            redirect: false
        });

        console.log(result, "this is the result of the login");
        if (result) {
            if (result.ok) {
                alert('Login successful')
                router.push('/welcome');
            } else {
                alert('Failed to login');
            }
        } else {
            console.error('No response from signin');
        }
    };

    const handleSignupRedirect = () => {
        router.push('/signup');
    }

    return (
        <main>
            <Header />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
                <br />
                <button type="button" onClick={handleSignupRedirect}>Signup</button>
            </form>

            <Footer />
        </main>
    );
}
