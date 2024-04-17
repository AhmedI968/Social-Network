import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

// for landing page
export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Welcome to the Social Network</h1>
        <p>Where authenticity meets connection.</p>
        <button className={styles.ctaButton}>
          <Link style={{textDecoration: 'none', color: 'white'}} href="/signup">Get Started</Link>
        </button>
      </section>
      <section className={styles.features}>
        <div className={styles.cardPage}>
          <h2>Meet New People</h2>
          <p>Connect with people who share your interests.</p>
        </div>
        <div className={styles.cardPage}>
          <h2>Share Your Story</h2>
          <p>Share your experiences and perspectives.</p>
        </div>
        <div className={styles.cardPage}>
          <h2>Join the Conversation</h2>
          <p>Engage with others in a meaningful way.</p>
        </div>
        <div className={styles.cardPage}>
          <h2>Transparency and Trust</h2>
          <p>Rate and be rated based on real interactions and see the true portrayal of others.</p>
        </div>
      </section>
      <Footer />
    </main >
  );
}
