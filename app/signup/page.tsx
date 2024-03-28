import React, { useState } from 'react';

const interestsList = ['Interest 1', 'Interest 2', 'Interest 3']; // Replace with your actual interests from the Prisma database

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const handleInterestChange = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSubmit = () => {
        // Perform form submission and database entry here
        // You can use the values stored in the state variables (email, username, password, confirmPassword, selectedInterests)
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                <label>Interests:</label>
                {interestsList.map((interest) => (
                    <div key={interest}>
                        <input
                            type="checkbox"
                            checked={selectedInterests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                        />
                        <span>{interest}</span>
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignupPage;