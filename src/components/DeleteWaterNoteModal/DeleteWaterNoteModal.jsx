import { Icon } from '../Icon/Icon';
import Modal from 'react-modal';
import css from "./DeleteWaterNoteModal.module.css"

const DeleteWaterNoteModal = ({ isOpen, onRequestClose, onDelete }) => {
     
    return (
      <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Entry"
            className={css.modalContent} 
            overlayClassName={css.modalOverlay}
        >
            
            <div>
                <div className={css.deleteEntryHeaderWrapper}>
                    <h2 className={css.deleteEntryHeader}>Delete entry</h2>
                    <button className={css.closeBtn} onClick={onRequestClose}>
                        <Icon
                id="icon-cross"
                width="24"
                height="24"
                onClick={onRequestClose}/>
            </button>
                </div>
                
            <p className={css.text}>Are you sure you want to delete entry?</p>
            </div>
            <div className={css.btnsWrapper}>
            <button className={css.deleteBtn} onClick={onDelete}>Delete</button>
            <button className={css.cancelBtn} onClick={onRequestClose}>Cancel</button>
            </div>
            
            
        </Modal>  
    )

}

export default DeleteWaterNoteModal