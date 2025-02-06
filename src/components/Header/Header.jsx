import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { Icon } from "../Icon/Icon.jsx";
import UserLogo from "../UserLogo/UserLogo";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const Header = ({ onLogoClick }) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div onClick={onLogoClick}>
          <Logo />
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          {" "}
          <UserLogo />
        </div>
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
