import { useState, useEffect } from "react";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import styles from "./UserLogoModal.module.css";

const UserLogoModal = ({ onClose }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${styles.userLogoModal}`)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.userLogoModal}>
        <button onClick={() => setIsSettingModalOpen(true)} className={styles.modalBtn}>
          Setting
        </button>
        <button onClick={() => setIsLogoutModalOpen(true)} className={styles.modalBtn}>
          Logout
        </button>
        {isSettingModalOpen && <SettingModal isOpen={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)} />}
        {isLogoutModalOpen && <UserLogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />}
      </div>
    </div>
  );
};

export default UserLogoModal;
