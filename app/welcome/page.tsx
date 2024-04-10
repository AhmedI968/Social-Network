import styles from '../page.module.css';
import Card from '../ui//welcome/card/card';
import History from '../ui/welcome/history/history';
import Rightbar from '../ui/welcome/rightbar/rightbar';
import Header from '@/components/header';
import Footer from '@/components/footer';

const welcome = () => {
    return (
        <div className={styles.welcome}>
            <Header />
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                </div>
                <History />
            </div>
            <h1>Welcome</h1>
            <div className={styles.side}>
                <Rightbar />

            </div>
            <Footer />
        </div>
    );
}

export default welcome;