// import { useState, useEffect } from "react";
// import Setting from "../Setting/Setting";
// import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
// import { Icon } from "../Icon/Icon.jsx";
// import styles from "./UserLogoModal.module.css";

// const UserLogoModal = ({ onClose, parentClass }) => {
//   const [isSettingOpen, setIsSettingOpen] = useState(false);
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (!event.target.closest(`.${parentClass}`)) {
//         onClose();
//       }
//     };

//     const handleEscPress = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     document.addEventListener("keydown", handleEscPress);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//       document.removeEventListener("keydown", handleEscPress);
//     };
//   }, [onClose, parentClass]);

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.userLogoModal}>
//         <button
//           onClick={() => setIsSettingOpen(true)}
//           className={styles.modalBtn}
//         >
//           <Icon
//             className={styles.icon}
//             id="icon-cog-6-tooth"
//             width="16"
//             height="16"
//           />
//           Setting
//         </button>
//         <button
//           onClick={() => setIsLogoutModalOpen(true)}
//           className={styles.modalBtn}
//         >
//           <Icon
//             className={styles.icon}
//             id="icon-arrow-right-on-rectanglesvg"
//             width="16"
//             height="16"
//           />
//           Logout
//         </button>
//         {isSettingOpen && (
//           <Setting
//             isOpen={isSettingOpen}
//             onClose={() => setIsSettingOpen(false)}
//           />
//         )}
//         {isLogoutModalOpen && (
//           <UserLogoutModal
//             isOpen={isLogoutModalOpen}
//             onClose={() => setIsLogoutModalOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserLogoModal;

import { useEffect } from "react";
import { Icon } from "../Icon/Icon.jsx";
import styles from "./UserLogoModal.module.css";

const UserLogoModal = ({
  onClose,
  parentClass,
  onSettingOpen,
  onLogoutOpen,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${parentClass}`)) {
        onClose();
      }
    };

    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscPress);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [onClose, parentClass]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.userLogoModal}>
        <button onClick={onSettingOpen} className={styles.modalBtn}>
          <Icon
            className={styles.icon}
            id="icon-cog-6-tooth"
            width="16"
            height="16"
          />
          Setting
        </button>
        <button onClick={onLogoutOpen} className={styles.modalBtn}>
          <Icon
            className={styles.icon}
            id="icon-arrow-right-on-rectanglesvg"
            width="16"
            height="16"
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserLogoModal;
