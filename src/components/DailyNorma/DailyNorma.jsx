import { useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import styles from "./DailyNorma.module.css";

const DailyNorma = () => {
  const waterRate = useSelector((state) => state.auth.user.waterRate);
  const [openDailyModal, setOpenDailyModal] = useState(false);
  const [water, setWater] = useState(waterRate);

  const onOpenDailyModal = () => setOpenDailyModal(true);
  const onCloseDailyModal = () => setOpenDailyModal(false);

  const userWaterRate = (value) => {
    setWater(value);
  };

  return (
    <div className={styles.wrapper_daily_norma}>
      <h2 className={styles.title_daily_norma}>My daily Norma</h2>
      <div className={styles.div_daily_norma}>
        <h3 className={styles.water_title_daily_norma}>
          {(water / 1000).toFixed(1)} L
        </h3>
        <button
          className={styles.btm_daily_norma}
          type="button"
          onClick={onOpenDailyModal}
        >
          Edit
        </button>
      </div>
      {openDailyModal && (
        <DailyNormaModal
          onCloseDailyModal={onCloseDailyModal}
          userWaterRate={userWaterRate}
        />
      )}
      <Toaster />
    </div>
  );
};

export default DailyNorma;
