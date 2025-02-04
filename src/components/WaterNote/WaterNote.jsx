import { Icon } from "../Icon/Icon.jsx";
import { useState } from 'react';
import DeleteWaterNoteModal from "../DeleteWaterNoteModal/DeleteWaterNoteModal.jsx";
import EditWaterNoteModal from "../EditWaterNoteModal/EditWaterNoteModal.jsx";

import css from "./WaterNote.module.css"



const WaterNote = ({ waternote }) => {
    const [isEditWaterNoteModalOpen, setIsEditWaterNoteModalOpen] = useState(false);
    const [isDeleteWaterNoteModalOpen, setIsDeleteWaterNoteModalOpen] = useState(false);

    const openEditWaterNoteModal = () => setIsEditWaterNoteModalOpen(true);
    const closeEditWaterNoteModal = () => setIsEditWaterNoteModalOpen(false);

    const openDeleteWaterNoteModal = () => setIsDeleteWaterNoteModalOpen(true);
    const closeDeleteWaterNoteModal = () => setIsDeleteWaterNoteModalOpen(false);

   const handleDelete = () => {
        // Логіка видалення запису
        closeDeleteWaterNoteModal();
     };

    return (
        <div className={css.waterNoteWrapper}>
            <div className={css.waterNoteDataWrapper}>
                <Icon
                id="icon-cup"
                width="26"
                height="26"/>
                <p className={css.waterNoteVolume}>{waternote.volume}</p> 
                <p className={css.waterNoteTime}>{waternote.time}</p>  
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
               waternote={waternote}
           />

            <DeleteWaterNoteModal
                isOpen={isDeleteWaterNoteModalOpen}
                onRequestClose={closeDeleteWaterNoteModal}
                onDelete={handleDelete}
            />

       </div>
   )
}

export default WaterNote;