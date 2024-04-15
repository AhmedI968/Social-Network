"use client";
import React, { use, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAllMatchedUsers } from '@/pages/api/fetchAllMatchedUsers';

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
        <div>
            <h1>User Matches</h1>
            <ul>
                <li>
                    {matchedUsers.map((user, index) => (
                        <>
                            <label>
                                {user.user_id} - User
                            </label>
                            <button onClick={() => handleRateButton(user.user_id)}>
                                Rate
                            </button>
                        </>
                    ))}
                </li>
            </ul>
        </div>
    )
};

export default displayMatches;