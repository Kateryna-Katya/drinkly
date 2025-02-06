import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import Loader from "../../components/Loader/Loader"

import { fetchWaterCupsToday } from "../../redux/water/operations";
import { selectWaterLoading } from "../../redux/water/selectors";

import css from "./HomePage.module.css"





const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectWaterLoading);

  useEffect(() => {
    dispatch(fetchWaterCupsToday());
  }, [dispatch]);

  return (
    <div className={css.homePage}>
      <div className={css.todayAndCalendarWrapper}>
        <div>{isLoading && <Loader />}</div>
        <TodayWaterList />
      </div>
      
     
    </div>
    
  );
};

export default HomePage;