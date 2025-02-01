import css from "./WhyDrinkWater.module.css";

import { Icon } from "../Icon/Icon";

const WhyDrinkWater = () => {
  return (
    <div className={css.welcomeWhyDrink}>
      <h3 className={css.welcomeWhyDrinkName}>Why drink water</h3>
      <ul className={css.welcomeWhyDrinkList}>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Supply of nutrients to all organs</p>
        </li>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Providing oxygen to the lungs</p>
        </li>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Maintaining the work of the heart</p>
        </li>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Release of processed substances</p>
        </li>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Ensuring the stability of the internal environment</p>
        </li>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Maintaining within the normal temperature</p>
        </li>
        <li className={css.welcomeWhyDrinkListItem}>
          <Icon id="icon-circle" className={css.welcomeIconCircle} />
          <p>Maintaining an immune system capable of resisting disease</p>
        </li>
      </ul>
    </div>
  );
};
export default WhyDrinkWater;
