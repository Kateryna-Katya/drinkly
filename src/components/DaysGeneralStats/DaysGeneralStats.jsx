import { format } from "date-fns";
import { useState } from "react";

import css from "./DaysGeneralStats.module.css";
import clsx from "clsx";

const DaysGeneralStats = ({ item, offsetLeft }) => {
  const [isMobile] = useState(innerWidth <= 768);

  return (
    <ul
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
