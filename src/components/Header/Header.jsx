import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { Icon } from "../Icon/Icon.jsx";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

const Header = ({ isAuthenticated, user }) => {
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);

  const handleLogoClick = () => {
    if (isAuthenticated) {
      setIsUserLogoModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsUserLogoModalOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div onClick={handleLogoClick}>
          <Logo />
        </div>
      </div>

      {isUserLogoModalOpen && <UserLogoModal onClose={handleCloseModal} />}

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
