import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { Icon } from "../Icon/Icon.jsx";

const Header = ({ isAuthenticated, user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to={isAuthenticated ? "/home" : "/"}>
          <Logo />
        </Link>
      </div>

      {isAuthenticated ? (
        <div>{user.name}</div>
      ) : (
        <Link to="/signin" className={styles.authBtn}>
          Sign In
          <Icon className={styles.icon} id="icon-user" width="28" height="28" />
        </Link>
      )}
    </header>
  );
};

export default Header;
