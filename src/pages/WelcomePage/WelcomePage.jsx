import WaterConsumptionTracker from "../../components/WaterConsumptionTracker/WaterConsumptionTracker";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";

import css from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={css.WelcomePageContainer}>
      <div className={css.welcomePage}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
    </div>
  );
};
export default WelcomePage;
