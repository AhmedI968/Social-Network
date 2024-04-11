import styles from "./button.module.css";
import Link from "next/link";

const Button = () => {
  return (
    <button className={styles.buttonStyle}>
      <Link href="../login">Sign In</Link></button>
  );
};

export default Button;