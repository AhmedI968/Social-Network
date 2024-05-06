import styles from "./button.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from "next/link";

function AuthButton() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <>
      {session?.user?.name} <br />
      <button onClick={() => signOut()} className={styles.buttonStyle}>Sign Out</button>
      </>
    );
  }
  return (
    <>
    <button onClick={() => signIn()} className={styles.buttonStyle}>Sign In</button>
    </>
  )
}

export default AuthButton;
