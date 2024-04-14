"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import { register } from './register';

export default function SignupPage() {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [location, setLocation] = useState('');
    // const [age, setAge] = useState<number>(0);

    // const router = useRouter();

    // const handleSubmit = async (event: any) => {
    //     event.preventDefault();

    //     if (password !== confirmPassword) {
    //         alert("Passwords do not match");
    //         return;
    //     }

    //     const userData = {
    //         firstName,
    //         lastName,
    //         email,
    //         username,
    //         password,
    //         location,
    //         age
    //     };

    //     const response = await fetch('/api/createUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(userData)
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         alert("User created successfully");
    //         router.push('/login');
    //     } else {
    //         const errorData = await response.json();
    //         alert(errorData.message)
    //     }
    // };

    return (
        <div>
            <h1>Signup Page</h1>
            <form action={register} className={styles.form}>

                <label>First Name:</label>
                <input type="text" placeholder="firstName" name="firstname" required />
                <br />
                <label>Last Name:</label>
                <input type="text" placeholder="lastName" name="lastName" required />
                <br />
                <label>Email:</label>
                <input type="email" placeholder="email" name="email" required />
                <br />
                <label>Username:</label>
                <input type="text" placeholder="username" name="username" required />
                <br />
                <label>Password:</label>
                <input type="password" placeholder="password" name="password" required />
                <br />
                <label>Confirm Password:</label>
                <input type="password" placeholder="password" name="password" required />
                <br />
                <label>Location:</label>
                <input type="text" placeholder="location" name="location" required />
                <br />
                <label>Age:</label>
                <input type="number" placeholder="age" name="age" required />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};