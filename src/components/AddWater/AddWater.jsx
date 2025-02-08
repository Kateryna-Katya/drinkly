import styles from "./AddWater.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { useState } from "react";
import useModalClose from "../../hooks/useModalClose";
import TimeInput from "../TimeInput/TimeInput.jsx";

const Modal = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(0);

  const { handleBackdropClick } = useModalClose(isOpen, onClose);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 50);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 50));
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.btnClose} onClick={onClose}>
          <div className={styles.cross}></div>
        </button>

        <h2 className={styles.title}>Add water</h2>
        <p className={styles.text1}>Choose a value:</p>
        <p className={styles.text2}>Amount of water:</p>

        <div className={styles.wrapperQuantity}>
          <button className={styles.btnQuantity} onClick={handleDecrement}>
            <Icon
              id="icon-minus-small"
              width="24"
              height="24"
              className={styles.iconMinus}
            />
          </button>
          <span className={styles.quantity}>{quantity}ml</span>
          <button className={styles.btnQuantity} onClick={handleIncrement}>
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
            {/* <input type="time" className={styles.inputTime} /> */}
            <TimeInput />
          </label>
          <label className={styles.labelQuantity}>
            Enter the value of the water used:
            <input type="number" className={styles.inputQuantity} />
          </label>
        </form>

        <div className={styles.wrapperSave}>
          <span className={styles.quantitySave}>{quantity}ml</span>
          <button className={styles.btnSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
