import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";

import css from "./HomePage.module.css";
import DailyNormaModal from "../../components/DailyNormaModal/DailyNormaModal";

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <h1>HomePage</h1>
      <DailyNormaModal />
      <div className={css.todayAndCalendarWrapper}>
        <TodayWaterList />
      </div>
    </div>
  );
};

export default HomePage;
