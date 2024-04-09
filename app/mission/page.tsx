import React from 'react';
import styles from './styles.module.css';
import Header from "@/components/header";
import Footer from "@/components/footer";

const Mission = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Mission</h1>
      <p className={styles.paragraph}>
        The mission of The Social Network project is to enhance online friendship authenticity and transparency. We believe that authentic connections are fundamental to human well-being, and our platform is designed to facilitate genuine interactions beyond superficial attributes.
      </p>
      <p className={styles.paragraph}>
        Through user profiles, a rating system, cumulative scorecards, and anti-gaming measures, we aim to create a user-friendly environment where users can connect based on shared interests and experiences, fostering meaningful relationships.
      </p>
      <Footer />
    </div>
  );
};

export default Mission;
