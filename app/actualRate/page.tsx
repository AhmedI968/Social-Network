"use client";
import React, { use, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getSession } from 'next-auth/react';
import { MdOutlineInterests } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

interface UserInterest {
    interest_name: string;
    category_name: string;
}

export default function ActualRate() {
    const [username, setUsername] = useState('');
    const [userInterests, setUserInterests] = useState<UserInterest[]>([]);
    const [scores, setScores] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        // get the username from the local storage
        const username = localStorage.getItem('userYouAreRating');

        if (username) {
            setUsername(username);
        } 
    }, []);

    useEffect(() => {
        const fetchUserInterests = async () => {
            if (!username) return;

            console.log("this is the username", username);
            const response = await fetch('/api/getUserInterestsName', {
                headers: {
                    'Authorization': 'Bearer ' + username
                },
            });
            const data = await response.json();
            console.log("This is the data (printed from the fetch users)", data);
            setUserInterests(data);

            // initialize scores with zeros
            const initialScores: { [key: string]: number } = {};
            data.forEach((interest: UserInterest) => {
                // initialize score for each interest
                initialScores[`${interest.category_name}:${interest.interest_name}`] = 0;
            });
            setScores(initialScores);
        };
        fetchUserInterests();
    }, [username]);

    const groupedInterests = userInterests.length > 0 ? userInterests.reduce((groups: { [key: string]: string[] }, interest) => {
        const category = interest.category_name;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(interest.interest_name);
        return groups;
    }, {}) : {};

    const handleScoreChange = (category: string, interest: string, score: number) => {
        setScores(prevScores => ({...prevScores, [`${category}:${interest}`]: score}));
    };

    const handleSubmit = async () => {
        console.log("this is the scores", scores);
        try {
            const session = await getSession();
            const response = await fetch('/api/submitRating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session?.user.name + ' ' + username
                },
                body: JSON.stringify(scores),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("this is the data", data);
        } catch (error) {
            console.log("There was an error with the API call ", error)
        }
    }

    return (
        <div className={styles.item}>
        <div className={styles.bgContainer}>
            <MdOutlineInterests size={24} />
        </div>
        <div className={styles.text}>
            <span className={styles.title}>{username}'s Current Interests</span>
            <h3>What does {username} like right now?</h3>
            <div className={styles.interests}>
                {Object.entries(groupedInterests).map(([category, interests], index) => (
                    <div key={index}>
                        <h4>{category}</h4>
                        <select onChange={e => handleScoreChange(category, '', Number(e.target.value))}>
                            {[...Array(11).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <ul>
                            {interests?.map((interest: any, index: any) => (
                                <li key={index}>
                                    {interest}
                                    <select onChange={e => handleScoreChange(category, interest, Number(e.target.value))}>
                                        {[...Array(11).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                                    </select>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    );
};
