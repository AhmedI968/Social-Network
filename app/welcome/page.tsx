import styles from '../page.module.css';
import Card from '../ui//welcome/card/card';
import History from '../ui/welcome/history/history';
import Rightbar from '../ui/welcome/rightbar/rightbar';

const welcome = () => {
    return (
        <div className={styles.welcome}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                </div>
                <History />
            </div>
            <h1>Welcome</h1>
            <div className={styles.side}>
                <Rightbar />

            </div>
        </div>
    );
}

export default welcome;