"use client";
import React, { useState } from 'react';
import { createUser } from '../../lib/script';
import { useRouter } from 'next/navigation';

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

    const handleSubmit = (event: any) => {
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

        try {
            const newUser = createUser(userData);
            console.log("New user created: ", newUser);
            // redirect to login page
            router.push("/login");
        } catch (error) {
            console.error("Error creating user: ", error);
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