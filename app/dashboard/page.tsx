import styles from './styles.module.css';
import Card from './card/page';
import History from '../ui/welcome/history/history';
import Rightbar from '../ui/welcome/rightbar/rightbar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Scorecard from './scorecard/page';
import { MdStayPrimaryLandscape } from 'react-icons/md';


const welcome = () => {
    return (
        <div className={styles.welcome}>
            <div className={styles.profile}>
                <Header />
                <br />
                <button className={styles.profileButton}>
                    <Link style={{textDecoration: 'none', color: 'white'}} href="../profile">Edit Profile</Link>
                </button>
            </div>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card  />
                </div>
                <div className={styles.buttonSpace}>
                    <button className={styles.button}>
                        <Link style={{textDecoration: 'none', color: 'white'}} href="/welcome/scorecard">View Your Cumulative Scorecard</Link>
                    </button>
                </div>
                <div className={styles.historySpace}>
                    <History />
                </div>
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>

           <Footer />
        </div >
    );
}

export default welcome;