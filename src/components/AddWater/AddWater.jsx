import styles from "./AddWater.module.css";
import { Icon } from "../Icon/Icon.jsx";

const Modal = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.btnClose}>
          <Icon
            id="icon-trash"
            width="24"
            height="24"
            className={styles.iconClose}
          />
        </button>

        <h2 className={styles.title}>Add water</h2>
        <p className={styles.text1}>Choose a value:</p>
        <p className={styles.text2}>Amount of water:</p>

        <div className={styles.wrapperQuantity}>
          <button className={styles.btnQuantity}>
            <Icon
              id="icon-minus-small"
              width="24"
              height="24"
              className={styles.iconMinus}
            />
          </button>
          <span className={styles.quantity}>0ml</span>
          <button className={styles.btnQuantity}>
            <Icon
              id="icon-plus-small"
              width="24"
              height="24"
              className={styles.iconPlus}
            />
          </button>
        </div>

        <form className={styles.form}>
          <label className={styles.labelTime}>
            Recording time:
            <input className={styles.inputTime} />
          </label>
          <label className={styles.labelQuantity}>
            Enter the value of the water used:
            <input className={styles.inputQuantity} />
          </label>
        </form>

        <div className={styles.wrapperSave}>
          <span className={styles.quantitySave}></span>
          <button className={styles.btnSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
