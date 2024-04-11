import styles from "./button.module.css";
import Link from "next/link";

const Button = () => {
const handleLoginRedirect = () => {
    window.location.href = '/login';
  }

    return (
      <button onClick={handleLoginRedirect} className={styles.buttonStyle}>Sign In</button>
    );
  };
  
export default Button;