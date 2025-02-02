import { useState } from "react";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import styles from "./UserLogo.module.css";

const UserLogo = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getAvatarContent = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt="User Avatar" className={styles.avatar} />;
    }
    if (user.name) {
      return <div className={styles.avatarFallback}>{user.name.charAt(0).toUpperCase()}</div>;
    }
    return <div className={styles.avatarFallback}>{user.email.charAt(0).toUpperCase()}</div>;
  };

  return (
    <div className={styles.userLogoContainer}>
      <button className={styles.userLogo} onClick={toggleModal}>
        <span className={styles.userName}>{user.name || user.email}</span>
        {getAvatarContent()}
        <svg className={styles.icon}>
          <use href="#icon-chevron-down" />
        </svg>
      </button>

      {isModalOpen && <UserLogoModal onClose={toggleModal} />}
    </div>
  );
};

export default UserLogo;
