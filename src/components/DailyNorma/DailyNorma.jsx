import { useEffect, useState } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import styles from "./DailyNorma.module.css";
import axios from "axios";

const DailyNorma = () => {
  const [openDailyModal, setOpenDailyModal] = useState(false);
  const [waterCount, setWaterCount] = useState("");

  const onOpenDailyModal = () => {
    setOpenDailyModal(true);
  };

  const onCloseDailyModal = () => {
    setOpenDailyModal(false);
  };

  const rawAuth = localStorage.getItem("persist:auth");
  const parsedAuth = rawAuth ? JSON.parse(rawAuth) : null;
  const token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : null;
  const userId = parsedAuth?.token ? JSON.parse(parsedAuth.userId) : null;

  useEffect(() => {
    const fetchWater = async () => {
      const { data } = await axios.get(
        `https://water-app-backend.onrender.com/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let waterRate = data.data.waterRate;
      let waterLiter = waterRate / 1000;
      let waterFix = waterLiter.toFixed(1);
      setWaterCount(waterFix);
    };
    fetchWater();
  }, [token, userId]);

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
          waterCount={waterCount}
        />
      )}
    </div>
  );
};

export default DailyNorma;
