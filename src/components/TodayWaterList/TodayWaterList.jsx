import WaterNote from "../WaterNote/WaterNote";
import { Icon } from "../Icon/Icon";


const TodayWaterList = () => {

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
        <button>
            <Icon
            id="icon-plus-small"
            width="16"
            height="16"/>
            Add water
         </button>
    </div>
        
    )
  
}

export default TodayWaterList;