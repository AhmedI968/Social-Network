"use client"
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfilePage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <UserProfileForm />
            <hr />
            <UserInterestForm />
        </div>
    );
}

function UserProfileForm() {
    const router = useRouter();
    const [race, setRace] = useState('');
    const [gender, setGender] = useState('');
    const [sexuality, setSexuality] = useState('');
    const [religion, setReligion] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch('/api/getUserProfile');
            const data = await response.json();
            setRace(data.race);
            setGender(data.gender);
            setSexuality(data.sexuality);
            setReligion(data.religion);
            setBio(data.bio);
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (event : any) => {
        event.preventDefault();

        const response = await fetch('/api/updateUserProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') as string
            },
            body: JSON.stringify({ race, gender, sexuality, religion, bio })
        });

        if (response.ok) {
            alert('Profile updated successfully');
            router.push('/profile');
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                    Race:
                    <input type="text" value={race} onChange={(e) => setRace(e.target.value)} required />
                </label>
                <br />
                <label>
                    Gender:
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                </label>
                <br />
                <label>
                    Sexuality:
                    <input type="text" value={sexuality} onChange={(e) => setSexuality(e.target.value)} required />
                </label>
                <br />
                <label>
                    Religion:
                    <input type="text" value={religion} onChange={(e) => setReligion(e.target.value)} required />
                </label>
                <br />
                <label>
                    Bio:
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

type Interest = {
    interest_id: string;
    interest_name: string;
  };
  
  type InterestCategory = {
    category_id: string;
    category_name: string;
    interests: Interest[];
  };
  
function UserInterestForm() {
    const [interestCategories, setInterestCategories] = useState<any[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const fetchInterestCategories = async () => {
            const response = await fetch('/api/getInterestCategories', {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token') as string
                },
            });
            const data = await response.json();
            setInterestCategories(data);
        };

        fetchInterestCategories();
    }, []);

    const handleCheckboxChange = (categoryId : any, interestId : any) => {

        setSelectedInterests((prevState) => {
            // if the category id is not in the selectedInterests object, add it
            if (!prevState[categoryId]) {
                return {
                    ...prevState,
                    [categoryId]: [interestId]
                };
            }

            // if the interest is already 
            if (prevState[categoryId].includes(interestId)) {
                return {
                    ...prevState,
                    [categoryId]: prevState[categoryId].filter((id : any) => id !== interestId)
                };
            }

            return {
                ...prevState,
                [categoryId]: [...prevState[categoryId], interestId]
            };
        });
    };

    const handleSubmit = async (event : any) => {
        event.preventDefault();

        const response = await fetch('/api/updateUserInterests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') as string
            },
            body: JSON.stringify({
                interests: Object.values(selectedInterests).flat()
            })
        });

        if (response.ok) {
            alert('Interests updated successfully');
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };

    //console.log(selectedInterests);
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '0 auto'}}>
            {interestCategories.map((category : InterestCategory) => (
                <details key={category.category_id}>
                    <summary style={{ cursor: 'pointer', fontSize: '1.2em' }}>{category.category_name}</summary>
                    {category.interests.map(interest => (
                        <div key={interest.interest_id}>
                            <input
                                type="checkbox"
                                checked={selectedInterests[category.category_id]?.includes(interest.interest_id)}
                                onChange={() => handleCheckboxChange(category.category_id, interest.interest_id)}
                            />
                            {interest.interest_name}
                        </div>
                    ))}
                </details>
            ))}
            <button type="submit" style={{ display: 'block', margin: '0 auto' }}>Update Interests</button>
        </form>
    );
}