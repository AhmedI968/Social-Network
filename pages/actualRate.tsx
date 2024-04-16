"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getSession } from 'next-auth/react';
import { MdOutlineInterests } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';

interface UserInterest {
    interest_name: string;
    category_name: string;
}

export default function ActualRate() {
    const [username, setUsername] = useState('');
    const [userInterests, setUserInterests] = useState<UserInterest[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setUsername(params.get('username') || '');

        const fetchUserInterests = async () => {
            console.log(username);
            const response = await fetch('/api/getUserInterestsName', {
                headers: {
                    'Authorization': 'Bearer ' + username
                },
            });
            const data = await response.json();
            console.log(data);
            setUserInterests(data);
        };
        fetchUserInterests();
    }, []);

    const groupedInterests = userInterests.length > 0 ? userInterests.reduce((groups: { [key: string]: string[] }, interest) => {
        const category = interest.category_name;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(interest.interest_name);
        return groups;
    }, {}) : {};

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
                        <ul>
                            {interests?.map((interest: any, index: any) => (
                                <li key={index}>{interest}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};
