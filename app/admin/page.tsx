"use client"
import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from '../ui/admin/admin.module.css';
import Search from '../ui/admin/search/search';
import Link from 'next/link';
import { useState } from 'react';
import { prisma } from '@/lib/script';

const AdminPage = ({ placeholder }: { placeholder: string }) => {
    const [interestName, setInterestName] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const handleCreate = async (event: any) => {
        event.preventDefault();

        const response = await fetch('/api/createInterest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interestName, categoryName })
        });
        // alert the user if the response is ok or not ok
        if (response.ok) {
            const data = await response.json();
            if (categoryName && interestName) {
                alert("Interest created successfully");
            } else {
                alert("Category created successfully");
            }
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };


    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.top}>
                <Search placeholder={"Search for a user..."} />
                <Link href="/admin/addUser">
                    <button className={styles.addButton}>Add User</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Last Active</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <td className={styles.user}>johndoe123</td>

                    <td>John</td>
                    <td>Doe</td>
                    <td>john.doe@gmail.com</td>
                    <td>13.01.2022</td>
                    <td>Active</td>
                    <td>
                        <Link href="/">
                            <button className={`${styles.button} ${styles.view}`}>View Details</button>
                            <button className={`${styles.button} ${styles.suspend}`}>Suspend</button>

                        </Link>
                    </td>

                </tbody>
            </table>

        <form onSubmit={handleCreate}>
            <label>
                Category Name:
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </label>
            <label>
                Interest Name:
                <input type="text" value={interestName} onChange={(e) => setInterestName(e.target.value)} />
            </label>
            <button type="submit">Create Interest/Category</button>
        </form>
        <Footer />
        </div>
        
    );
}

export default AdminPage;
