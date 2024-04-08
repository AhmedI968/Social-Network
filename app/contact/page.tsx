import React from 'react';
import styles from './styles.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.paragraph}>
        If you have any inquiries, feedback, or suggestions regarding The Social Network project, feel free to reach out to us using the contact information provided below.
      </p>
      <p className={styles.paragraph}>
        Email: example@example.com
      </p>
      <p className={styles.paragraph}>
        Phone: +1234567890
      </p>
    </div>
  );
};

export default Contact;
