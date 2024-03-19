// Login Page
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/true');
    };

    return (
        <main>
            <Header />
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
            <Footer />
        </main>
    );
}
