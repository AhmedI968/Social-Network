import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import styles from "./navbar.module.css"
import WrappedButton from "./Button";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className={styles.outer}>
        <div className={styles.middle}>
          <div className={styles.inner}>
            <Logo />
            <button
              type="button"
              className={styles.button1}
              onClick={toggle}
              title="Title"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <ul className={styles.ulStyle}>
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/mission">
                  <p>Our Mission</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p>Contact</p>
                </Link>
              </li>
            </ul>
            <div className={styles.ulStyle2}>
              <WrappedButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;