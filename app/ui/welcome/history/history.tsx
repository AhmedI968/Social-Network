"use client"
import styles from './history.module.css';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Match = {
    ratingUser: string;
    lastUpdated: string;
    rating: number;
    hasWrittenFeedback: boolean;
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
            setMatches(data);
            console.log("from history", data)
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
                        <th>Rating Received</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(matches) && matches.map((item, index) => (
                        <tr key={index} onClick={() => writeFeedback(item.ratingUser)}>
                            <td>
                                <div className={styles.user}>{item.ratingUser}</div>
                            </td>
                            <td>
                                {item.hasWrittenFeedback ?
                                    <span className={`${styles.status} ${styles.done}`}>Done</span> :
                                    <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                                }
                            </td>
                            <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                            <td>{item.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </div >
        </div >
    );
}

export default History;