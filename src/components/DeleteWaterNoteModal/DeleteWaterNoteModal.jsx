import { Icon } from '../Icon/Icon';
import Modal from 'react-modal';

const DeleteWaterNoteModal = ({ isOpen, onRequestClose, onDelete }) => {
     
    return (
      <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Entry"
        >
            
            <div>
                <div>
                    <h2>Delete entry</h2>
            <Icon
            id="icon-cross"
                width="24"
                height="24"
                onClick={onRequestClose}/>
                </div>
                
            <p>Are you sure you want to delete entry?</p>
            </div>
            <div>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onRequestClose}>Cancel</button>
            </div>
            
            
        </Modal>  
    )

}

export default DeleteWaterNoteModal