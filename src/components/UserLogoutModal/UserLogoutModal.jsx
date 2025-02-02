import css from "./UserLogoutModal.module.css";
import { Icon } from "../Icon/Icon.jsx";

const UserLogoutModal = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.iconCloseBtn}>
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
          <button className={css.btnLogout}>Log out</button>
          <button className={css.btnCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserLogoutModal;
