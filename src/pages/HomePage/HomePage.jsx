import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";

import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <h1>HomePage</h1>
      <div className={css.todayAndCalendarWrapper}>
        <TodayWaterList />
      </div>
    </div>
  );
};

export default HomePage;
