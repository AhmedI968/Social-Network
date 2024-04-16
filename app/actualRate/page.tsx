"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { Router } from 'react-router-dom';

const RatingPage = (username : string) => {
    const username2 = 'mark3';
    const [ratings, setRatings] = useState<{[key: string]:number}>({});
    const router = useRouter();
    const [interests, setInterests] = useState<any[]>([]);

    const handleRatingChange = (interestId: string, rating: number) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [interestId]: rating
        }));
    };

    useEffect(() => {
        const fetchRatings = async () => {
            const response = await fetch('/api/fetchAllInterests',
            {
                headers: {
                    'Authorization': 'Bearer ' + username2
                }
            });
            const data = await response.json();
            console.log(data);
            const groupedInterests = data.reduce((groups: { [key: string]: any[] }, interest: any) => {
                const category = interest.category_name;
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push(interest);
                return groups;
            }, {});
            console.log(groupedInterests, 'groupedInterests');
            setInterests(groupedInterests)
        }

        fetchRatings();
    }, []);


    const handleSubmit = async () => {
        try {
            // Temp null values till I figure out how to get scoredcard_id and 
            // auth ready to get signed in user id
            for (const interestId in ratings) {
                const newScore = ratings[interestId]

                const newData = {
                    ratingUserID: null,
                    interestID: interestId,
                    ratedUserID: username,
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

                router.push('/app/DisplayMatches/page')
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
                {Object.entries(interests).map(([category, interests], index) => (
                    <div key={index}>
                        <h2>{category}</h2>
                        <ul>
                            {interests.map((interest: any, i: number) => (
                                <li key={i}>
                                    <label>
                                        {interest.interest_name}
                                        <select
                                            value={ratings[interest.interest_id] || 0}
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
                    </div>
                ))}
                <br />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default RatingPage;