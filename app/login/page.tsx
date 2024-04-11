// Login Page
import styles from '../page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { signIn } from 'next-auth/webauthn';
import { authenticate } from '@/app/authenticate';



export default function LoginPage() {
    return (
        <main>
            <Header />
            <h1>Login</h1>
            <form action={authenticate} className={styles.form}>
                <label>
                    Username:
                    <input type="text" placeholder="username" name="username" required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" placeholder="password" name="password" required />
                </label>
                <button type="submit">Login</button>
            </form>
            <Footer />
        </main>
    );
}
