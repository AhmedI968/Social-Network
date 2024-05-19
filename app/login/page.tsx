// Login Page
"use client";

import styles from './styles.module.css';
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
                router.push('/dashboard');
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
        <main className={styles.centered}>
            <Header />
            <form onSubmit={handleLogin}>
                <h1 className={styles.title}>Login</h1>
                <div className={styles.container}>
                    <label>
                        Username:
                        <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button className={styles.button} type="submit">Login</button>
                    <br />
                    <button className={`${styles.button} ${styles.signupBtn}`} type="button" onClick={handleSignupRedirect}>Signup</button>
                </div>
            </form>

            <Footer />
        </main>
    );
}
