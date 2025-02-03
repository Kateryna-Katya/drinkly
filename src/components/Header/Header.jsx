import { Link } from 'react-router-dom';
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
        <div>{user.name}</div>
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
