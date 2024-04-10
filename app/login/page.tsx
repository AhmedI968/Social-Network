// Login Page
'use client'
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful');
            router.push('/');
        } else {
            const errorData = await response.json();
            router.push('/signup')
            alert(errorData.message);
        }
    };

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
                </form>
            <Footer />
        </main>
    );
}
