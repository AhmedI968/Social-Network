import styles from './card.module.css';
import { GrScorecard } from 'react-icons/gr';

const Card = () => {
    return (
        <div className={styles.container}>
            <GrScorecard size={24} />

            <div className={styles.text}>
                <span className={styles.title}>Your Current Score</span>
                <span className={styles.number}>7.5</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>Above average </span>score. Keep it up!</span>

            </div>
        </div >
    );
}

export default Card;
