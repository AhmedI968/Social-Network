import React from 'react';
import styles from './styles.module.css';
import Header from "@/components/header";
import Footer from "@/components/footer";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.paragraph}>
        The Social Network project aims to address the longstanding issue of authenticity in online friendships. Our platform endeavors to bridge the gap between the quantity and quality of online connections, fostering transparency and genuine interactions.
      </p>
      <p className={styles.paragraph}>
        With the rise of social media platforms, users often struggle to form meaningful connections amidst superficial interactions. The Social Network project proposes a solution through a rating system that enhances authenticity and transparency, matching individuals based on shared interests.
      </p>
      <p className={styles.paragraph}>
        Our motivation stems from the desire to improve the overall socializing experience in the digital age by fostering transparency and authenticity in online interactions.
      </p>
      <Footer />
    </div>
  );
};

export default About;
