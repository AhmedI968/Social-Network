import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from '../ui/admin/admin.module.css';
import Search from '../ui/admin/search/search';
import Link from 'next/link';

const AdminPage = ({ placeholder }: { placeholder: string }) => {
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
                    <td><div className={styles.user}>
                        johndoe123</div></td>

                    <td>John</td>
                    <td>Doe</td>
                    <td>john.doe@gmail.com</td>
                    <td>13.01.2022</td>
                    <td>Active</td>
                    <td>
                        <div className={styles.button}>
                            <Link href="/">
                                <button className={`${styles.button} ${styles.view}`}>View Details</button>
                                <button className={`${styles.button} ${styles.suspend}`}>Suspend</button>

                            </Link>
                        </div>
                    </td>

                </tbody>
            </table>
            <Footer />
        </div>

    );
}

export default AdminPage;
