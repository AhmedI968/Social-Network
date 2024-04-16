"use client";
import styles from '@/app/ui/admin/add/add.module.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AddUserPage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState<number>(0);

    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const userData = {
            username,
            firstName,
            lastName,
            email,
            password,
            location,
            age
        }

        const response = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        );
        if (response.ok) {
            const data = await response.json();
            alert("User created successfully");
            router.push('/admin');
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    }


    return (
        <div className={styles.container}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
                <button type="submit" className={styles.button}>Add User</button>
            </form>
            <Footer />
        </div >
    )


}