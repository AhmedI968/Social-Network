// Footer.js

import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; 2024 The Social Network</p>
            <p>Created by your local developer squad, Team Lakeshow</p>
            <ul className={styles.linkList}>
                <li><a href="https://ca.linkedin.com/in/mark-cena-bb8658267">Mark Cena</a></li>
                <li><a href="https://www.linkedin.com/in/ahmedibrahimmohamedseifeldin/">Ahmed Hassan</a></li>
                <li><a href="https://www.linkedin.com/in/derek-atabayev/">Derek Atabayev</a></li>
            </ul>
        </footer>
    );
}
