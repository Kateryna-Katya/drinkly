import { useSelector } from "react-redux";
import { useState } from "react";
import WaterNote from "../WaterNote/WaterNote";
import Modal from "../AddWater/AddWater";
import { selectWaterRecordsToday } from "../../redux/water/selectors";

import { Icon } from "../Icon/Icon";

import css from "./TodayWaterList.module.css";

const TodayWaterList = ({ setRefresh, refresh }) => {
  const waterRecords = useSelector(selectWaterRecordsToday);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedWaterRecords = [...waterRecords].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className={css.todayWaterListSectionWrapper}>
      <h2 className={css.todayWaterListHeader}>Today</h2>
      <div className={css.todayWaterListWrapper}>
        {sortedWaterRecords.length > 0 ? (
          <ul className={css.scrollableList}>
            {sortedWaterRecords.map((waterRecord) => (
              <li key={waterRecord._id}>
                <WaterNote
                  setRefresh={setRefresh}
                  refresh={refresh}
                  id={waterRecord._id}
                  waterVolume={waterRecord.waterVolume}
                  time={waterRecord.time}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.text}>No notes yet</p>
        )}
      </div>
      <button
        className={css.todayWaterListBtn}
        onClick={() => setIsModalOpen(true)}
      >
        <Icon id="icon-plus-small" width="16" height="16" viewBox="0 0 16 16" />
        Add water
      </button>
      {isModalOpen && (
        <Modal
          setRefresh={setRefresh}
          refresh={refresh}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TodayWaterList;
