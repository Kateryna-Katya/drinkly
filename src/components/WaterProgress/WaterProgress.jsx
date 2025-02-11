import { useEffect } from "react";
import s from "./WaterProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  // selectTotalWaterAmount,
  // selectDailyNorm,
  selectPercentage,
} from "../../redux/water/selectors";
import { fetchWaterToday } from "../../redux/water/operations";
import Modal from "../AddWater/AddWater";

const WaterProgress = () => {
  const dispatch = useDispatch();
  // const totalWaterAmount = useSelector(selectTotalWaterAmount);
  // const dailyNorm = useSelector(selectDailyNorm);
  const percentage = useSelector(selectPercentage);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWaterToday());
  }, [dispatch]);

  const displayPercentage = isNaN(percentage) ? 0 : percentage;

  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <h3>Today</h3>
        {/* <p className={s.percentage}>{percentage}%</p> */}
        <div className={s.sliderContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={displayPercentage}
            readOnly
            className={s.slider}
            style={{ "--progress": `${displayPercentage}%` }}
          />
          <div
            className={s.sliderValue}
            style={{ left: `calc(${displayPercentage}% - 20px)` }}
          >
            {displayPercentage}%
          </div>
          <div className={s.labelContainer}>
            <div className={s.wrapLabel}>
              <span className={s.labelOne}>|</span>
              <span className={s.label}>0%</span>
            </div>
            <div className={s.wrapLabel}>
              <span className={s.labelOne}>|</span>
              <span className={s.label}>50%</span>
            </div>
            <div className={s.wrapLabel}>
              <span className={s.labelOne}>|</span>
              <span className={s.label}>100%</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={s.button}
      >
        {" "}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 7V13M13 10H7M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={s.icon}
          />
        </svg>
        <p className={s.buttonText}>Add Water</p>
      </button>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            dispatch(fetchWaterToday());
          }}
        />
      )}
    </div>
  );
};

export default WaterProgress;
