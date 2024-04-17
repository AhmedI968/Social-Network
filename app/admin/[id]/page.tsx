"use client"
import styles from '@/app/ui/admin/singleUser/singleUser.module.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import updateUser from '@/pages/api/updateUser'
import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function updateUserPage({ params }: { params: any }) {

    const { user_id } = params;
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState<number>(0);

    const router = useRouter();

    const handleUpdate = async (event: any) => {
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

        const user = await updateUser(userData, user_id);
        if (user) {
            alert("User updated successfully");
            router.push('/admin');
        } else {
            alert("Failed to update user");
        }
    }
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.infoContainer}>{username}</div>
            <div className={styles.formContainer}>
                <form onSubmit={handleUpdate} className={styles.form}>
                    <input type="hidden" name="id" placeholder={user_id} />
                    <label>Username</label>
                    <input type="text" name="username" placeholder={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>First Name</label>
                    <input type="text" name="first name" placeholder={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label>Last Name</label>
                    <input type="text" name="last name" placeholder={lastName || ''} onChange={(e) => setLastName(e.target.value)} />

                    <label>Email</label>
                    <input type="email" name="email" placeholder={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" name="password" placeholder={password} onChange={(e) => setPassword(e.target.value)} />

                    <label>Location</label>
                    <input type="location" name="location" placeholder={location || ''} onChange={(e) => setLocation(e.target.value)} />

                    <label>Age</label>
                    <input type="number" name="age" placeholder={age?.toString()} onChange={(e) => setAge(parseInt(e.target.value))} />
                    <button type="submit">Update</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}
