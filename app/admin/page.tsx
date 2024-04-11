import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from '../ui/admin/admin.module.css';
import Search from '../ui/admin/search/search';
import Link from 'next/link';
import { fetchAllUsers } from '@/pages/api/fetchAllUsers';

const AdminPage = async () => {

    const users = await fetchAllUsers();
    // console.log(users); // for testing
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.top}>
                <Search placeholder={"Search for a user..."} />
                <Link href="/admin/add">
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
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            <td className={styles.user}>{user.username}</td>

                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link href="/admin/test">
                                    <button className={`${styles.button} ${styles.view}`}>View Details</button>
                                    <button className={`${styles.button} ${styles.suspend}`}>Suspend</button>

                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div >

    );
}

export default AdminPage;
