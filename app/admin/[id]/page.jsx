import styles from '@/app/ui/admin/singleUser/singleUser.module.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const SingleUserPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.infoContainer}>John Doe</div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="jdoe" />

                    <label>First Name</label>
                    <input type="text" name="first name" placeholder="John" />

                    <label>Last Name</label>
                    <input type="text" name="last name" placeholder="Doe" />

                    <label>Email</label>
                    <input type="email" name="email" placeholder="jdoe@gmail.com" />

                    <label>Password</label>
                    <input type="password" name="password" />

                    <label>Location</label>
                    <input type="location" name="location" placeholder="New York" />

                    <label>Age</label>
                    <input type="number" name="age" placeholder="25" />
                    <button>Update</button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default SingleUserPage;