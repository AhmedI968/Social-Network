"use client"
import styles from './history.module.css';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Match = {
    matchedUser: string;
    matchedAt: string;
    ratingGiven: number | string;
    ratingReceived: number | string;
    feedbackReceived: boolean;
}

const History = () => {
    const router = useRouter();
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const session = await getSession();
            const response = await fetch('/api/getRatingHistory', {
                headers: {
                    'Authorization': 'Bearer ' + session?.user.name
                }
            });
            const data = await response.json();
        };

        fetchMatches();
    }, []);

    const writeFeedback = (username: string) => {
        localStorage.removeItem('userYouAreWriting');
        localStorage.setItem('userYouAreWriting', username);
        router.push('/writeFeedback')
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your Latest Matches</h2>
            <div className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Rating Given</th>
                        <th>Rating Received</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(matches) && matches.map((item, index) => (
                        <tr key={index} onClick={() => writeFeedback(item.matchedUser)}>
                            <td>
                                <div className={styles.user}>{item.matchedUser}</div>
                            </td>
                            <td>
                                {item.feedbackReceived ?
                                    <span className={`${styles.status} ${styles.done}`}>Done</span> :
                                    <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                                }
                            </td>
                            <td>{new Date(item.matchedAt).toLocaleDateString()}</td>
                            <td>{item.ratingGiven}</td>
                            <td>{item.ratingReceived}</td>
                        </tr>
                    ))}
                </tbody>
            </div >
        </div >
    );
}

export default History;