import { Icon } from "../Icon/Icon.jsx";
import { useState } from 'react';
import DeleteWaterNoteModal from "../DeleteWaterNoteModal/DeleteWaterNoteModal.jsx";
import EditWaterNoteModal from "../EditWaterNoteModal/EditWaterNoteModal.jsx";


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
        <div>
            <div>
                <Icon
                id="icon-cup"
                width="24"
                height="24"/>
                <p>{waternote.volume}</p> 
                <p>{waternote.time}</p>
                
            </div>
            <div>
                <Icon
                id="icon-pencil-square"
                width="16"
                    height="16"
                onClick={openEditWaterNoteModal}/>
                <Icon
                id="icon-trash"
                width="16"
                    height="16"
                onClick={openDeleteWaterNoteModal}/>
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