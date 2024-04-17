"use client"
import styles from './card.module.css';
import { GrScorecard } from 'react-icons/gr';
import { use, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';


const Card = () => {
    const [score, setScore] = useState<number | string | null>(null);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchScore = async () => {
            const session = await getSession();
            setCurrentUser(session?.user.name as string);
            try {
                const response = await fetch('/api/fetchCumulativeScore', {
                    headers: {
                        'Authorization' : 'Bearer ' + session?.user.name
                    },
                });
                const data = await response.json();
                setScore(data.score);
            } catch (error) {
                console.error("Error fetching score:", error);
                setScore("N/A");
            }
        };

        fetchScore();
    }, []);

    let scoreMessage, scoreClass;
    if (score === "N/A") {
        scoreMessage = "Not rated yet";
    } else if (typeof score === 'number') {
        if (score <= 2.4) {
            scoreMessage = "Poor score: please be a better person";
            scoreClass = styles.negative;
        } else if (score <= 4.9) {
            scoreMessage = "Below average score: you have some room for improvement";
            scoreClass = styles.warning;
        } else if (score <= 7.4) {
            scoreMessage = "Average score: Nice!";
            scoreClass = styles.warning;
        } else {
            scoreMessage = "Above average score. Keep it up!";
            scoreClass = styles.positive;
        }
    } else {
        scoreMessage = "Not rated yet";
        scoreClass = styles.neutral;
    }

    return (
        <div className={styles.container}>
            <GrScorecard size={24} />

            <div className={styles.text}>
                <span className={styles.title}>Your Current Score ({currentUser})</span>
                <span className={styles.number}>{score}</span>
                <span className={styles.detail}>
                    <span className={scoreClass}>{scoreMessage}</span>
                </span>
            </div>
        </div >
    );
}

export default Card;
