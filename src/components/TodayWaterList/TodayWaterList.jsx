import WaterNote from "../WaterNote/WaterNote";
import Modal from "../AddWater/AddWater";
import { Icon } from "../Icon/Icon";

import { useState } from "react";



const TodayWaterList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const waterNotes = [];

    return (<div>
        <h2>Today</h2>
        <div>
         <ul>
            {waterNotes.map(waterNote => (
                <li key={waterNote.id}>
                    <WaterNote />
             </li>
         ))}   
         </ul>
        </div>
        <button onClick={() => setIsModalOpen(true)}>
            <Icon
            id="icon-plus-small"
            width="16"
            height="16"/>
            Add water
        </button>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
        
    )
  
}

export default TodayWaterList;