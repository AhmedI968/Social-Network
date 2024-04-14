import styles from '../page.module.css';
import Card from '../ui//welcome/card/card';
import History from '../ui/welcome/history/history';
import Rightbar from '../ui/welcome/rightbar/rightbar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Scorecard from './scorecard/page';


const welcome = () => {
    return (
        <div className={styles.welcome}>

            <Header />
            <div className={styles.profile}>
                <button className={styles.profileButton}>
                    <Link href="../profile">Edit Profile</Link>
                </button>
            </div>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <button className={styles.button}>
                        <Link href="/welcome/scorecard">View Your Cumulative Scorecard</Link></button>
                </div>
                <History />
            </div>
            <div className={styles.side}>
                <Rightbar />

            </div>

            <Footer />
        </div >
    );
}

export default welcome;