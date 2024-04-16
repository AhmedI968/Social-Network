"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllInterests } from '@/pages/api/fetchAllInterests';
import styles from './styles.module.css';
import { Router } from 'react-router-dom';

const RatingPage = async (user_id : string) => {
    const [ratings, setRatings] = useState<{[key: string]:number}>({});
    const interests = await fetchAllInterests(user_id);
    const router = useRouter();

    const handleRatingChange = (interestId: string, rating: number) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [interestId]: rating
        }));
    };

    const handleSubmit = async () => {
        try {
            // Temp null values till I figure out how to get scoredcard_id and 
            // auth ready to get signed in user id
            for (const interestId in ratings) {
                const newScore = ratings[interestId]

                const newData = {
                    ratingUserID: null,
                    interestID: interestId,
                    ratedUserID: user_id,
                    new_score: newScore,
                    scorecardID: null,
                };

                const response = await fetch('/api/createInterestRating', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                })

                router.push('./app/ui/rating/DisplayMatches')
            }
        } catch(error) {
            console.error('Error Submitting Ratings:', error)
        }
    }

    return (
        <div>
            <h1>User Interests</h1>
            <br />
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
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default RatingPage;