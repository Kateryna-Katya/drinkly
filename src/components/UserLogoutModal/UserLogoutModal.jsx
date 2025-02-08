import css from "./UserLogoutModal.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations.js";
import Modal from "react-modal";

const UserLogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      className={css.modal}
      overlayClassName={css.backdrop}
      onRequestClose={onClose}
    >
      <button type="button" className={css.iconCloseBtn} onClick={onClose}>
        <Icon
          id="icon-cross"
          width="24"
          height="24"
          className={css.iconClose}
        />
      </button>

      <h2 className={css.title}>Log out</h2>
      <h3 className={css.text1}>Do you really want to leave?</h3>

      <div className={css.containerBtn}>
        <button className={css.btnLogout} onClick={handleLogout}>
          Log out
        </button>
        <button className={css.btnCancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default UserLogoutModal;
