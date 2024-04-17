"use client"
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MdOutlineInterests } from 'react-icons/md';
import styles from '../ui/welcome/rightbar/rightbar.module.css';


interface UserInterest {
    interest_name: string;
    category_name: string;
}

export default function UserProfilePage() {
    const [userInterests, setUserInterests] = useState<UserInterest[]>([]);
    const userYouAreViewing = localStorage.getItem('userYouAreViewing') || '';
    const [race, setRace] = useState('');
    const [gender, setGender] = useState('');
    const [sexuality, setSexuality] = useState('');
    const [religion, setReligion] = useState('');
    const [bio, setBio] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch('/api/getUserProfile', {
                headers: {
                    'Authorization': 'Bearer ' + userYouAreViewing
                }
            });

            if (!response.ok) {
                console.error('Error status: ', response.status);
                return;
            }

            console.log(response);

            const data = await response.json();
            setRace(data.race);
            setGender(data.gender);
            setSexuality(data.sexuality);
            setReligion(data.religion);
            setBio(data.bio);
        };

        const fetchUserInterests = async () => {
            const session = await getSession();
            const response = await fetch('/api/getUserInterestsName', {
                headers: {
                    'Authorization': 'Bearer ' + userYouAreViewing
                }
            });
            const data = await response.json();
            setUserInterests(data);
        };

        fetchUserProfile();
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

    const handleButtonClick = () => {
        localStorage.removeItem('userYouAreRating');
        localStorage.setItem('userYouAreRating', userYouAreViewing);
        router.push('/actualRate');
    }

    return (
        <div className={styles.profileItem}>
            <div className={styles.item}>
                <div className={styles.text}>
                    <span className={styles.title}>{userYouAreViewing}'s Current Interests</span>
                    <h3>What do they like right now?</h3>
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

            <div className={styles.item2}>
                <div className={styles.text}>
                    <h2>User Profile</h2>
                    <p><strong>Race:</strong> {race}</p>
                    <p><strong>Gender:</strong> {gender}</p>
                    <p><strong>Sexuality:</strong> {sexuality}</p>
                    <p><strong>Religion:</strong> {religion}</p>
                    <p><strong>Bio:</strong> {bio}</p>
                </div>
                
            </div>
            <div className={styles.profileItem}>
                <button onClick={handleButtonClick} className={styles.rateButton}>Rate User</button>
            </div>
        </div>
    );
}