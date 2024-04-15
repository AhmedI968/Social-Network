"use client";
import React, { use, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAllMatchedUsers } from '@/pages/api/fetchAllMatchedUsers';
import styles from './styles.module.css';

const displayMatches = async (user_id : string) => {

    const matchedUsers = await fetchAllMatchedUsers(user_id);
    const router = useRouter();

    const handleRateButton = (userId: string) => {
        router.push({
            pathname: '/app/ui/rating/actualRate/page',
            query: {user_id: userId}
        })
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>User Matches</h1>
            <ul className={styles.userList}>
                {matchedUsers.map((user, index) => (
                    <li className={styles.matchedUserItem}>
                        <label>
                            {user.user_id} - User
                        </label>
                        <button onClick={() => handleRateButton(user.user_id)}>
                            Rate
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default displayMatches;