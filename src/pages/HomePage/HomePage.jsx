import Header from "../../components/Header/Header";
import WaterConsumptionTracker from "../../components/WaterConsumptionTracker/WaterConsumptionTracker";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import AddWater from "../../components/AddWater/AddWater";

import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.WelcomePageContainer}>
      <Header />
      <div className={css.welcomePage}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
        <AddWater />
      </div>
    </div>
  );
};
export default HomePage;
