import { useDispatch } from "react-redux";
import { deleteWaterCup } from "../../redux/water/operations";
import Modal from "react-modal";
import { toast } from "react-toastify";

import { Icon } from "../Icon/Icon";

import css from "./DeleteWaterNoteModal.module.css";
import { useRefresh } from "../useRefresh";

const DeleteWaterNoteModal = ({ isOpen, onRequestClose, _id }) => {
  const dispatch = useDispatch();
  const { triggerRefresh } = useRefresh();
  const handleDelete = async () => {
    const resultAction = await dispatch(deleteWaterCup(_id));

    onRequestClose();
    if (deleteWaterCup.fulfilled.match(resultAction)) {
      toast.success("Water entry successfully deleted", {
        className: css.toast,
      });
    } else {
      toast.error("Failed to delete water entry", { className: css.toast });
    }
    triggerRefresh();
  };

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
            <Icon id="icon-cross" width="24" height="24" />
          </button>
        </div>

        <p className={css.text}>Are you sure you want to delete entry?</p>
      </div>
      <div className={css.btnsWrapper}>
        <button type="button" className={css.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelBtn} onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteWaterNoteModal;
