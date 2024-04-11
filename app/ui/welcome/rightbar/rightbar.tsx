import styles from './rightbar.module.css';
import { FcRating } from 'react-icons/fc';
import { AiOutlineProfile } from 'react-icons/ai';
import { MdOutlineInterests } from 'react-icons/md';


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
                    <button className={styles.button}>
                        <AiOutlineProfile />View Their Profile</button>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <MdOutlineInterests size={24} />
                </div>
                <div className={styles.text}>
                    <span className={styles.title}>Your Current Interests</span>
                    <h3>What do you like right now?</h3>
                    <div className={styles.interests}>
                        <tbody>
                            <tr>Music</tr>
                            <tr>Art</tr>
                            <tr>Technology</tr>
                            <tr>Food</tr>
                        </tbody>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default Rightbar;