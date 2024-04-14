// Login Page
"use server";
import styles from '../page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { signIn } from 'next-auth/webauthn';
import { authenticate } from '@/app/login/authenticate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default async function LoginPage() {
    // const router = useRouter();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const handleLogin = async (event: any) => {
    //     event.preventDefault();
    //     const response = await fetch('/api/loginUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ username, password })
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         localStorage.setItem('token', data.token);
    //         alert('Login successful');
    //         router.push('/welcome');
    //     } else {
    //         const errorData = await response.json();
    //         alert(errorData.message);
    //     }
    // };

    // const handleSignupRedirect = () => {
    //     router.push('/signup');
    // }

    return (
        <main>
            <Header />
            <h1>Login</h1>
            <form action={authenticate}>
                <label>
                    Username:
                    <input type="text" placeholder="username" name="username" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" placeholder="password" name="password" />
                </label>
                <button type="submit">Login</button>
                <br />
            </form>
            <Footer />
        </main>
    );
}
