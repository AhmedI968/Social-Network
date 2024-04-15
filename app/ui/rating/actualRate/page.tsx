"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllInterests } from '@/pages/api/fetchAllInterests';
import styles from './styles.module.css';

const RatingPage = async (user_id : string) => {
    const [ratings, setRatings] = useState<{[key: string]:number}>({});
    const interests = await fetchAllInterests(user_id);

    const handleRatingChange = (interestId: string, rating: number) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [interestId]: rating
        }));
    };

    return (
        <div>
            <h1>User Interests</h1>
            <form>
                <ul>
                    {interests.map((interest, index) => (
                        <li key={index}>
                            <label>
                                {interest.interest_name} - Rate:
                                <select
                                    value={ratings[interest.interest_id]}
                                    onChange={(e) => handleRatingChange(interest.interest_id, parseInt(e.target.value))}
                                >
                                    {[...Array(11).keys()].map((rating) => (
                                        <option key={rating} value={rating}>{rating}</option>
                                    ))}
                                </select>
                            </label>
                        </li>
                    ))}
                </ul>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RatingPage;