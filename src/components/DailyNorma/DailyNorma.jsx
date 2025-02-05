import { useState } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import styles from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [openDailyModal, setOpenDailyModal] = useState(false);
  const [waterCount, setWaterCount] = useState(2);

  const onOpenDailyModal = () => {
    setOpenDailyModal(true);
  };

  const onCloseDailyModal = () => {
    setOpenDailyModal(false);
  };

  const getValue = (value) => {
    return setWaterCount(value);
  };

  return (
    <div className={styles.wrapper_daily_norma}>
      <h2 className={styles.title_daily_norma}>My daily Norma</h2>
      <div className={styles.div_daily_norma}>
        <h3 className={styles.water_title_daily_norma}>{waterCount} L</h3>
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
          getValue={getValue}
        />
      )}
    </div>
  );
};

export default DailyNorma;
