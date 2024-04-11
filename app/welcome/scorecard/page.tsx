import styles from '@/app/ui/welcome/scorecard/scorecard.module.css';

const Scorecard = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your Latest Matches</h2>
            <div className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Rating Received</th>
                        <th><button className={styles.button}>Feedback</button>
                            Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>John Doe</div></td>
                        <td>01/01/2021</td>
                        <td>8.5</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>John Doe</div></td>
                        <td>01/01/2021</td>
                        <td>8.5</td>
                    </tr>
                </tbody>
            </div >
        </div >
    );
}

export default Scorecard;