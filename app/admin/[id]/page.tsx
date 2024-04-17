"use client"
import styles from '@/app/ui/admin/singleUser/singleUser.module.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import updateUser from '@/pages/api/updateUser'
import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function updateUserPage() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.infoContainer}></div>
            <div className={styles.formContainer}>
                <UserUpdateForm />
                <Footer />
            </div>
        </div>
    )
}

function UserUpdateForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();

            const response = await fetch('/api/user/fetchUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response)

            const data = await response.json();

            setUsername(data.username);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPassword(data.password);
            setLocation(data.location);
            setAge(data.age);

        };

        fetchData();
    }, []);


    const handleUpdate = async (event: any) => {
        event.preventDefault();

        const session = await getSession();

        const username = session?.user.name;
        const user = await fetch('/api/user/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, firstName, lastName, email, password, location, age }),
            credentials: 'include',
        });

        if (user.ok) {
            alert('User updated successfully');
            router.push('/admin');
        } else {
            const errorData = await user.json();
            alert(errorData.message);
        }
    };
    return (
        <div>
            <form onSubmit={handleUpdate} className={styles.form}>
                <input type="hidden" name="id" />
                <label>Username
                    <input type="text" name="username" placeholder={username} onChange={(e) => setUsername(e.target.placeholder)} />
                </label>
                <label>First Name
                    <input type="text" name="first name" placeholder={firstName} onChange={(e) => setFirstName(e.target.placeholder)} />
                </label>
                <label>Last Name
                    <input type="text" name="last name" placeholder={lastName || ''} onChange={(e) => setLastName(e.target.placeholder)} />
                </label>
                <label>Email
                    <input type="email" name="email" placeholder={email} onChange={(e) => setEmail(e.target.placeholder)} />
                </label>
                <label>Password
                    <input type="password" name="password" placeholder={password} onChange={(e) => setPassword(e.target.placeholder)} />
                </label>
                <label>Location
                    <input type="location" name="location" placeholder={location || ''} onChange={(e) => setLocation(e.target.placeholder)} />
                </label>
                <label>Age
                    <input type="number" name="age" placeholder={age?.toString()} onChange={(e) => setAge(parseInt(e.target.placeholder))} />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
