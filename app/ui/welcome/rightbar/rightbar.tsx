import styles from './rightbar.module.css';
import { FcRating } from 'react-icons/fc';
const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <FcRating size={24} />
                </div>
                <div className={styles.text}>
                    <span className={styles.title}>Your Next Match</span>
                    <h3>Curated based on your interests.</h3>
                    <span className={styles.detail}>John Doe</span>
                    <span className={styles.link}>View Their Profile</span>
                </div>
                <h2>Rightbar</h2>
                <p>Rightbar description</p>
            </div>
        </div>

    );
}

export default Rightbar;