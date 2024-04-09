import Link from "next/link";
import styles from "./sidebar.module.css"

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <>
      <div
        className={styles.sidebarContainer}
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
        }}
      >
        <ul className={styles.sideBarUl}>
          <li>
            <Link href="/about" onClick={toggle}>
              <p>About Us</p>
            </Link>
          </li>
          <li>
            <Link href="/mission" onClick={toggle}>
              <p>Our Mission</p>
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={toggle}>
              <p>Contact</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;