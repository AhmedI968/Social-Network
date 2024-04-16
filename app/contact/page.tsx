import React from 'react';
import styles from './styles.module.css';
import Header from "@/components/header";
import Footer from "@/components/footer";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.paragraph}>
        If you have any inquiries, feedback, or suggestions regarding The Social Network project, feel free to reach out to us using the contact information provided below.
      </p>
      <p className={styles.paragraph}>
        Email: contact@theSocialNetwork.com
      </p>
      <p className={styles.paragraph}>
        Phone: +1 (938)-860-0199
      </p>
      <Footer />
    </div>
  );
};

export default Contact;
