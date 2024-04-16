import styles from "./button.module.css";
import { useSession, signOut, SessionProvider, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

const Button = () => {
  const { data: session } = useSession();

  const handleRedirect = () => {
    if (session) {
      signOut({callbackUrl: '/login'});
    } else {
      window.location.href = '/login';
    }
  }

  return (
    <button onClick={handleRedirect} className={styles.buttonStyle}>
      {session ? "Logout" : "Login"}
      </button>
  );
};

const WrappedButton = () => {
  const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          const session = await getSession();
          setSession(session);
      };
      console.log(session);
      fetchData();
  }, []);

  return (
    <SessionProvider session={session}>
    <Button />
  </SessionProvider>
  );
};
  
export default WrappedButton;