"use client"
import React, { useState, useEffect } from 'react';
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

function UserInterestForm() {
    return (
        <form></form>
    );
}