import WaterNote from "../WaterNote/WaterNote";
import Modal from "../AddWater/AddWater";

import { Icon } from "../Icon/Icon";


import { useState } from "react";

import css from "./TodayWaterList.module.css";


const TodayWaterList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const waterNotes = [ { id: 1, volume: '250 ml', time: '08:00' },
        { id: 2, volume: '500 ml', time: '10:00' },
        { id: 3, volume: '300 ml', time: '15:00' },
        { id: 4, volume: '100 ml', time: '06:00' },
        { id: 5, volume: '50 ml', time: '22:25' },
    { id: 6, volume: '1150 ml', time: '22:50' },];

    return (<div className={css.todayWaterListSectionWrapper}>
         
        <h2 className={css.todayWaterListHeader}>Today</h2>
        <div className={css.todayWaterListWrapper}>
         <ul className={css.scrollableList}>
           {waterNotes.map(waterNote => (
               <li className={css.waterNoteDataWrapper} key={waterNote.id}>
                    <p className={css.waterNoteVolume}>{waterNote.volume}</p>
                            <p>{waterNote.time}</p>
                    <WaterNote waternote={`Volume: ${waterNote.volume}, Time: ${waterNote.time}`}/>
             </li>
         ))}    
         </ul>
        </div>
        <button className={css.todayWaterListBtn} onClick={() => setIsModalOpen(true)}>
            <Icon
            id="icon-plus-small"
            width="16"
                height="16"
                viewBox="0 0 16 16"
            />
            Add water
        </button>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
        
    )
  
}

export default TodayWaterList;