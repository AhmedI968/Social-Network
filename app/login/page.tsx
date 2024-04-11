// Login Page
import styles from '../page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { signIn } from 'next-auth/webauthn';
import { authenticate } from '@/app/authenticate';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event : any) => {
        event.preventDefault();
        const response = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Login successful');
            router.push('/welcome');
        } else {
            const errorData = await response.json();
            router.push('/signup')
            alert(errorData.message);
        }
    };

    const handleSignupRedirect = () => {
        router.push('/signup');
    }

    return (
        <main>
            <Header />
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Login</button>
                    <br />
                    <button type="button" onClick={handleSignupRedirect}>Signup</button>
                </form>

            <Footer />
        </main>
    );
}
