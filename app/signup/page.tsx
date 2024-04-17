"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState<number>(0);

    const router = useRouter();

    const cancelRedirect  = () => {
        router.push('/')
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            username,
            password,
            location,
            age
        };

        const response = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            alert("User created successfully");
            router.push('/login');
        } else {
            const errorData = await response.json();
            alert(errorData.message)
        }
    };

    return (
        <main className={styles.centered}>
            <Header />
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Signup Page</h1>
                <p>Please complete this form to create an account on The Social Network</p>
                <div className={styles.container}>
                    <label>
                        First Name:
                        <input className={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input className={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Username:
                        <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />    
                    </label>
                    <br />
                    <label>
                        Password:
                        <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input className={styles.input} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Location:
                        <input className={styles.input} type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Age:
                        <input className={styles.input} type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} required />
                    </label>
                    <br />
                    <button className={`${styles.button} ${styles.signupBtn}`} type="submit">Sign Up</button>
                    <br />
                    <button className={`${styles.button} ${styles.cancelbtn}`} onClick={cancelRedirect}>Cancel</button>
                </div>
            </form>

            <Footer />
        </main>
    );
};