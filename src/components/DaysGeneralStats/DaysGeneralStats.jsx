import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useModalClose from "../../hooks/useModalClose.js";
import useClickOutside from "../../hooks/useClickOutside.js";
import css from "./DaysGeneralStats.module.css";
import clsx from "clsx";

const DaysGeneralStats = ({ item, offsetLeft }) => {
  const [isMobile] = useState(innerWidth < 768);

  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  useModalClose(isOpen, handleClose); // Закриття по Escape
  useClickOutside(modalRef, handleClose); // Закриття при кліку за межами модалки

  if (!isOpen) return null;

  return (
    <ul
      ref={modalRef}
      className={clsx(css.wrapper, offsetLeft > 250 && css.goLeft)}
      style={{ left: isMobile && -offsetLeft - 7 }}
    >
      <li className={css.text}>{format(item.date, "d, MMMM")}</li>
      <li className={css.text}>
        Daily norma:{" "}
        <span className={css.accent}>{item.dailyNorm / 1000} L</span>
      </li>
      <li className={css.text}>
        Fulfillment of the daily norm:{" "}
        <span className={css.accent}> {item.percentage}%</span>
      </li>
      <li className={css.text}>
        How many servings of water:{" "}
        <span className={css.accent}>{item.waterRecords.length}</span>
      </li>
    </ul>
  );
};

export default DaysGeneralStats;
