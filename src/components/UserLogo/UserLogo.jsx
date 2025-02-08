import { useState } from "react";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import { Icon } from "../Icon/Icon.jsx";
import styles from "./UserLogo.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal.jsx";
import Setting from "../Setting/Setting";

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const user = useSelector(selectUser);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.userLogoContainer}>
      <button className={styles.userLogo} onClick={toggleModal}>
        <span className={styles.userName}>
          {user.name !== null
            ? user.name
            : user.email !== null && user.email.split("@")[0]}
        </span>
        <div className={styles.avatar}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {user.name !== null
                ? user.name.charAt(0).toUpperCase()
                : user.email !== null && user.email.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <Icon
          className={styles.icon}
          id="icon-chevron-double-up"
          width="16"
          height="16"
        />
      </button>

      {isModalOpen && (
        <UserLogoModal
          onClose={toggleModal}
          onSettingOpen={() => setIsSettingOpen(true)}
          onLogoutOpen={() => setIsLogoutModalOpen(true)}
          parentClass={styles.userLogoContainer}
        />
      )}
      {isSettingOpen && (
        <Setting
          isOpen={isSettingOpen}
          onClose={() => setIsSettingOpen(false)}
        />
      )}
      {isLogoutModalOpen && (
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLogo;
