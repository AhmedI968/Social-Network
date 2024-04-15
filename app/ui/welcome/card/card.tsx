"use client"
import styles from './card.module.css';
import { GrScorecard } from 'react-icons/gr';
import { use, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';


const Card = () => {
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchScore = async () => {
            const session = await getSession();
            const response = await fetch('/api/fetchCumulativeScore', {
                headers: {
                    'Authorization' : 'Bearer ' + session?.user.name
                },
            });
            const data = await response.json();
            setScore(data.score);
        };

        fetchScore();
    }, []);

    // const score = await retrieveCumulativeScore();
    return (
        <div className={styles.container}>
            <GrScorecard size={24} />

            <div className={styles.text}>
                <span className={styles.title}>Your Current Score</span>
                <span className={styles.number}>{score}</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>Above average </span>score. Keep it up!</span>

            </div>
        </div >
    );
}

export default Card;
