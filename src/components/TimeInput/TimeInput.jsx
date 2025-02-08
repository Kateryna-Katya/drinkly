import { useEffect } from "react";
import styles from "./TimeInput.module.css";
import { Field } from "formik";

const TimeInput = ({ time, setTime }) => {
  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
  }, []);

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
