import styles from "./AddWater.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { useState } from "react";
import useModalClose from "../../hooks/useModalClose";
import TimeInput from "../TimeInput/TimeInput.jsx";
import { useDispatch } from "react-redux";
import { saveWaterCup } from "../../redux/water/operations.js";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(50);
  const [time, setTime] = useState("");

  const { handleBackdropClick } = useModalClose(isOpen, onClose);

  const handleIncrement = () => {
    if (quantity < 15000) setQuantity((prevQuantity) => prevQuantity + 50);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 50));
  };

  const handleInputChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const date = new Date().toISOString();

  const handleSave = async () => {
    onClose();

    const resultAction = await dispatch(
      saveWaterCup({ amount: quantity, date, time })
    );
    if (saveWaterCup.fulfilled.match(resultAction)) {
      console.log(time),
        toast.success("Water saved", { className: styles.toast });
    } else {
      toast.error("Failed to save water", {
        className: styles.toast,
      });
    }
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

        <Formik>
          <Form className={styles.form}>
            <label className={styles.labelTime}>
              Recording time:
              <TimeInput time={time} setTime={setTime} />
            </label>
            <label className={styles.labelQuantity}>
              Enter the value of the water used:
              <Field
                value={quantity === 0 ? null : quantity}
                type="number"
                name="entervalue"
                className={styles.inputQuantity}
                onChange={handleInputChange}
                min="50"
                max="15000"
                maxLength="5"
              />
            </label>
          </Form>
        </Formik>

        <div className={styles.wrapperSave}>
          <span className={styles.quantitySave}>{quantity}ml</span>
          <button className={styles.btnSave} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
