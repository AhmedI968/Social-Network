"use client";
import React, { useState } from 'react';
import { createUser } from '../../lib/script';
import { useRouter } from 'next/navigation';
import { prisma } from '../../lib/script';

export default function SignupPage() {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState(''); 

    const router = useRouter();

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
        
        const data = await response.json();

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
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>

                <label>First Name:</label> 
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

                <label>Last Name:</label> 
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />


                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                <label>Location:</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};