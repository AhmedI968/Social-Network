import styles from '@/app/ui/admin/add/add.module.css';
import Footer from '@/components/footer';
import Header from '@/components/header';

const AddUserPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <form action="" className={styles.form}>
                <input type="text" placeholder="Username" name="Username" required />
                <input type="text" placeholder="First Name" name="First Name" required />
                <input type="text" placeholder="Last Name" name="Last Name" />
                <input type="text" placeholder="Email" name="Email" required />
                <input type="text" placeholder="Password" name="Password" required />
                <input type="text" placeholder="Location" name="Location" />
                <input type="number" placeholder="Age" name="Age" />
                <button type="submit" className={styles.button}>Add User</button>
            </form>
            <Footer />
        </div >)


}
export default AddUserPage;