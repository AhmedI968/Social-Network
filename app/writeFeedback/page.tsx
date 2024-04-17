"use client"
import { useState } from "react";
import { getSession } from "next-auth/react";

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState<string>('');

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        console.log("sending ", feedback);
        const userYouAreWriting = localStorage.getItem('userYouAreWriting');
        const session = await getSession();

        const response = await fetch('/api/writeFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.name + ' ' + userYouAreWriting
            },
            body: JSON.stringify({ feedback })
        });

        const data = await response.json();

        if (data) {
            alert("Feedback submitted successfully");
        } else {
            alert("Failed to submit feedback");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Feedback:
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
