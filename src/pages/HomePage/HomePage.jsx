import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import DailyNorma from "../../components/DailyNorma/DailyNorma";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <DailyNorma />
      <TodayWaterList />
    </div>
  );
};

export default HomePage;
