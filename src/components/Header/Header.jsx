import { Link } from 'react-router-dom';
import UserLogo from '../UserLogo/UserLogo';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header = ({ isAuthenticated, user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to={isAuthenticated ? '/' : '/signin'}>
          <Logo />
        </Link>
      </div>

      {isAuthenticated ? (
        <UserLogo user={user} />
      ) : (
        <Link to="/signin" className={styles.authBtn}>
          Sign In
          <svg className={styles.icon}>
            <use href="#icon-user" />
          </svg>
        </Link>
      )}
    </header>
  );
};

export default Header;
