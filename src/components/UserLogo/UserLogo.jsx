import { useState } from "react";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import { Icon } from "../Icon/Icon.jsx";
import styles from "./UserLogo.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.userLogoContainer}>
      <button className={styles.userLogo} onClick={toggleModal}>
        <div className={styles.avatar}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {user.email !== null ? user.email.charAt(0).toUpperCase() : "A"}
            </div>
          )}
        </div>
        <span className={styles.userName}>{user.name}</span>
        <Icon
          className={styles.icon}
          id="icon-chevron-double-up"
          width="16"
          height="16"
        />
      </button>

      {isModalOpen && <UserLogoModal onClose={toggleModal} />}
    </div>
  );
};

export default UserLogo;
