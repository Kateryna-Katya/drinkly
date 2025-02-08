import { useState, useEffect } from "react";
import styles from "./TimeInput.module.css";

const TimeInput = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
  }, []);

  return (
    <input
      className={styles.timeInput}
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  );
};

export default TimeInput;
