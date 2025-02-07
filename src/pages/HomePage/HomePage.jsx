import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";

import css from "./HomePage.module.css";
import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <h1>HomePage</h1>
      <DailyNorma />
      <div className={css.todayAndCalendarWrapper}>
        <TodayWaterList />
      </div>
    </div>
  );
};

export default HomePage;
