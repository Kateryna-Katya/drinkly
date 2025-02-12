import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import Loader from "../../components/Loader/Loader";

import { fetchWaterCupsToday } from "../../redux/water/operations";
import { selectWaterLoading } from "../../redux/water/selectors";

import css from "./HomePage.module.css";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import WaterProgress from "../../components/WaterProgress/WaterProgress";
import { RefreshProvider } from "../../components/refreshContext";

const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectWaterLoading);

  useEffect(() => {
    dispatch(fetchWaterCupsToday());
  }, [dispatch]);

  return (
    <RefreshProvider>
      <div className={css.homePage}>
        <div className={css.leftBlock}>
          <DailyNorma />
          <WaterProgress />
        </div>
        <div className={css.todayAndCalendarWrapper}>
          {isLoading && <Loader />}
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </RefreshProvider>
  );
};

export default HomePage;
