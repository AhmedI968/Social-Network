import styles from '@/app/ui/admin/singleUser/singleUser.module.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { retrieveUser } from '@/pages/api/fetchUser'
import { updateUser } from '@/pages/api/updateUser'


const SingleUserPage = async ({ params }) => {

    const { id } = params;
    const user = await retrieveUser(id);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.infoContainer}>{user.first_name}{user.last_name}</div>
            <div className={styles.formContainer}>
                <form action={updateUser} className={styles.form}>
                    <input type='hidden' name='id' value={user.user_id} />
                    <label>Username</label>
                    <input type="text" name="username" placeholder={user.username} />

                    <label>First Name</label>
                    <input type="text" name="first name" placeholder={user.first_name} />

                    <label>Last Name</label>
                    <input type="text" name="last name" placeholder={user.last_name} />

                    <label>Email</label>
                    <input type="email" name="email" placeholder={user.email} />

                    <label>Password</label>
                    <input type="password" name={user.password} />

                    <label>Location</label>
                    <input type="location" name="location" placeholder={user.location} />

                    <label>Age</label>
                    <input type="number" name="age" placeholder={user.age} />
                    <button>Update</button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default SingleUserPage;