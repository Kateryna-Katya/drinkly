import { useEffect } from "react";
import styles from "./TimeInput.module.css";
import { Field } from "formik";

const TimeInput = ({ time, setTime }) => {
  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toTimeString().slice(0, 5);
    setTime(formattedTime);
  }, [setTime]);

  return (
    <Field
      className={styles.timeInput}
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  );
};

export default TimeInput;
