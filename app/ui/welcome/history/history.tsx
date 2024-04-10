import styles from './history.module.css';

const History = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your Latest Matches</h2>
            <div className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Rating Received</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>John Doe</div></td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                        </td>
                        <td>01/01/2021</td>
                        <td>8.5</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>John Doe</div></td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>Done</span>
                        </td>
                        <td>01/01/2021</td>
                        <td>8.5</td>
                    </tr>
                </tbody>
            </div >
        </div >
    );
}

export default History;