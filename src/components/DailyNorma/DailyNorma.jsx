import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import styles from "./DailyNorma.module.css";
import axios from "axios";

const DailyNorma = () => {
  const token = useSelector((state) => state.auth.token);

  const [openDailyModal, setOpenDailyModal] = useState(false);
  const [water, setWater] = useState("");

  const onOpenDailyModal = () => setOpenDailyModal(true);
  const onCloseDailyModal = () => setOpenDailyModal(false);

  useEffect(() => {
    const fetchDailyNorm = async () => {
      try {
        const { data } = await axios.get(
          `https://water-app-backend.onrender.com/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setWater(data.data.waterRate.toFixed(1));
      } catch (error) {
        console.error("Failed to fetch water data:", error);
      }
    };

    fetchDailyNorm();
  }, [token]);

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
          waterNew={water}
          onCloseDailyModal={onCloseDailyModal}
          userWaterRate={userWaterRate}
        />
      )}
      <Toaster />
    </div>
  );
};

export default DailyNorma;
