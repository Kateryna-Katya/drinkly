import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";

import css from "./WaterConsumptionTracker.module.css";

const WaterConsumptionTracker = () => {
  return (
    <div className={css.welcome}>
      <h1 className={css.welcomeName}>Water consumption tracker</h1>
      <h2 className={css.welcomeName2}>Record daily water intake and track</h2>
      <h3 className={css.welcomeListName}>Tracker Benefits</h3>
      <ul className={css.welcomeList}>
        <li className={css.welcomeListItem}>
          <Icon id="icon-calendar-days" className={css.welcomeIcon} />
          <p>Habit drive</p>
        </li>
        <li className={css.welcomeListItem}>
          <Icon id="icon-presentation-chart-bar" className={css.welcomeIcon} />
          <p>View statistics</p>
        </li>
        <li className={css.welcomeListItem}>
          <Icon id="icon-wrench-screwdriver" className={css.welcomeIcon} />
          <p>Personal rate setting</p>
        </li>
      </ul>

      <Link to="/signup">
        <button type="button" className={css.welcomeBtn}>
          Try tracker
        </button>
      </Link>
    </div>
  );
};
export default WaterConsumptionTracker;
