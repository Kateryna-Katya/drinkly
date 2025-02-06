import { Icon } from "../Icon/Icon.jsx";
import { useState } from 'react';
import DeleteWaterNoteModal from "../DeleteWaterNoteModal/DeleteWaterNoteModal.jsx";
import EditWaterNoteModal from "../EditWaterNoteModal/EditWaterNoteModal.jsx";

import css from "./WaterNote.module.css"



const WaterNote = ({_id, waterVolume, time }) => {
    const [isEditWaterNoteModalOpen, setIsEditWaterNoteModalOpen] = useState(false);
    const [isDeleteWaterNoteModalOpen, setIsDeleteWaterNoteModalOpen] = useState(false);

    const openEditWaterNoteModal = () => setIsEditWaterNoteModalOpen(true);
    const closeEditWaterNoteModal = () => setIsEditWaterNoteModalOpen(false);

    const openDeleteWaterNoteModal = () => setIsDeleteWaterNoteModalOpen(true);
    const closeDeleteWaterNoteModal = () => setIsDeleteWaterNoteModalOpen(false);


    return (
        <div className={css.waterNoteWrapper}>
            <div className={css.waterNoteDataWrapper}>
                <Icon
                id="icon-cup"
                width="26"
                height="26"/>
                <p className={css.waterNoteVolume}>{waterVolume}</p> 
                <p className={css.waterNoteTime}>{time}</p>  
            </div>
            <div className={css.waterNoteBtnsWrapper}>
                <button className={css.waterNoteEditBtn} onClick={openEditWaterNoteModal}><Icon
                
                id="icon-pencil-square"
                width="16"
                    height="16"
                /></button>
                <button className={css.waterNoteDeleteBtn} onClick={openDeleteWaterNoteModal}>
                    <Icon
                
                id="icon-trash"
                width="16"
                    height="16"
                />
                </button>
                
            </div>

          <EditWaterNoteModal
               isOpen={isEditWaterNoteModalOpen}
               onRequestClose={closeEditWaterNoteModal}
           />

            <DeleteWaterNoteModal
                isOpen={isDeleteWaterNoteModalOpen}
                onRequestClose={closeDeleteWaterNoteModal}
                id={_id}
            />

       </div>
   )
}

export default WaterNote;