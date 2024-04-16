"use client"
import styles from './rightbar.module.css';
import { FcRating } from 'react-icons/fc';
import { AiOutlineProfile } from 'react-icons/ai';
import { MdOutlineInterests } from 'react-icons/md';
import {useEffect, useState} from 'react';
import { getSession } from 'next-auth/react';

interface UserInterest {
    interest_name: string;
    category_name: string;
}

const Rightbar = () => {

    const [nextMatch, setNextMatch] = useState(null);
    const [userInterests, setUserInterests] = useState<UserInterest[]>([]);
    
    useEffect(() => {
        const fetchNextMatch = async () => {
            const session = await getSession();
            const response = await fetch('/api/getNextMatch', {
                headers: {
                    'Authorization': 'Bearer ' + session?.user.name
                }
            });
            const data = await response.json();
            setNextMatch(data);
        };

        const fetchUserInterests = async () => {
            const session = await getSession();
            const response = await fetch('/api/getUserInterestsName', {
                headers: {
                    'Authorization': 'Bearer ' + session?.user.name
                }
            });
            const data = await response.json();
            console.log(data);
            setUserInterests(data);
        };

        fetchNextMatch();
        fetchUserInterests();
    }, []);

    const groupedInterests = userInterests.reduce((groups: { [key: string]: string[] }, interest) => {
        const category = interest.category_name;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(interest.interest_name);
        return groups;
    }, {});


    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <FcRating size={24} />
                </div>
                <div className={styles.text}>
                    <span className={styles.title}>Your Next Match</span>
                    <h3>Curated based on your interests.</h3>
                    <span className={styles.detail}>{nextMatch}</span>
                    <button className={styles.button}>
                        <AiOutlineProfile />View Their Profile
                    </button>
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
                        {Object.entries(groupedInterests).map(([category, interests], index) => (
                            <div key={index}>
                                <h4>{category}</h4>
                                <ul>
                                    {interests.map((interest, index) => (
                                        <li key={index}>{interest}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Rightbar;