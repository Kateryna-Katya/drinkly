import { useSelector } from "react-redux";
import { useState } from "react";
import WaterNote from "../WaterNote/WaterNote";
import Modal from "../AddWater/AddWater";

import { selectWaterRecordsToday } from "../../redux/water/selectors";

import { Icon } from "../Icon/Icon";

import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const waterRecords = useSelector(selectWaterRecordsToday);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.todayWaterListSectionWrapper}>
      <h2 className={css.todayWaterListHeader}>Today</h2>
      <div className={css.todayWaterListWrapper}>
        {waterRecords.length > 0 && (
          <ul className={css.scrollableList}>
            {waterRecords.map(({ _id, waterVolume, time }) => (
              <li className={css.waterRecordDataWrapper} key={_id}>
                <WaterNote id={_id} waterVolume={waterVolume} time={time} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className={css.todayWaterListBtn}
        onClick={() => setIsModalOpen(true)}
      >
        <Icon id="icon-plus-small" width="16" height="16" viewBox="0 0 16 16" />
        Add water
      </button>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TodayWaterList;
