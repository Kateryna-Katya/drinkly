import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./EditWaterNoteModal.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useModalClose from "../../hooks/useModalClose.js";
import { Icon } from "../Icon/Icon.jsx";
import { toast } from "react-toastify";
import {
  fetchWaterRecord,
  updateWaterRecord,
  fetchWaterToday,
} from "../../redux/water/operations";
import {
  selectWaterRecord,
  selectWaterError,
  selectWaterLoading,
} from "../../redux/water/selectors";
import { toggleRefreshTrigger } from "../../redux/water/slice";
import { useRefresh } from "../useRefresh.js";

const EditWaterNoteModal = ({
  isOpen,
  onClose,
  recordId,
  initialWaterVolume,
  initialTime,
}) => {
  const dispatch = useDispatch();
  const waterRecord = useSelector(selectWaterRecord);
  const loading = useSelector(selectWaterLoading);
  const error = useSelector(selectWaterError);
  const { triggerRefresh } = useRefresh();

  const [message, setMessage] = useState("");

  const [initialValues, setInitialValues] = useState({
    amount: 250,
    time: "07:00",
  });

  useEffect(() => {
    if (recordId) {
      dispatch(fetchWaterRecord(recordId));
    }
  }, [dispatch, recordId]);

  useEffect(() => {
    if (waterRecord) {
      const amount = waterRecord.waterVolume || 250;
      const time = waterRecord.time || "07:00";
      setInitialValues({ amount, time });
    }
  }, [waterRecord]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const { handleBackdropClick } = useModalClose(isOpen, onClose);

  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(50, "Minimum is 50 ml")
      .max(5000, "Maximum is 5000 ml")
      .required("Required"),
    time: Yup.string().required("Time is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Submitted values:", values);

    if (!recordId) {
      console.error("Error: recordId is missing");
      return;
    }

    const updatedData = {
      waterVolume: values.amount,
      time: values.time,
      date: new Date().toISOString(),
    };

   try {
      await dispatch(updateWaterRecord({ recordId, updatedData })).unwrap();
      toast.success("Water saved", { className: s.toast });

      await dispatch(fetchWaterToday());
      // dispatch(toggleRefreshTrigger());

      setTimeout(() => {
        setMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to save water", { className: s.toast });
    } finally {
      setSubmitting(false);
      triggerRefresh();
    }
  };

  const refreshData = () => {
    dispatch(fetchWaterToday());
  };

  if (!isOpen) return null;

  return (
    <div className={s.container} onClick={handleBackdropClick}>
      <div className={s.wrap}>
        <span className={s.wrapFirst}>
          <h2 className={s.modalTitle}>Edit the entered amount of water</h2>
          <button type="button" className={s.closeBtn} onClick={onClose}>
            <svg className={s.iconSecond}>
              <use xlinkHref={`#${"icon-icon-close"}`}></use>
            </svg>
          </button>
        </span>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Formik
          initialValues={{
            amount: initialWaterVolume || 250,
            time: initialTime || "07:00",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <div className={s.formikWrap}>
              <Form>
                {/* Дані з бекенду */}
                <div className={s.previous}>
                  <svg className={s.icon}>
                    <use xlinkHref={`#${"icon-cup"}`}></use>
                  </svg>
                  <span className={s.amount}>{initialWaterVolume} ml</span>
                  <span className={s.time}>{initialTime}</span>
                </div>

                {/*  кнопки */}
                <label className={s.labelTitle}>Correct entered data:</label>
                <h4 className={s.modalSubtitle}>Amount of water:</h4>
                <div className={s.waterAmountBtnBox}>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("amount", Math.max(values.amount - 50, 50))
                    }
                  >
                    <Icon
                      id="icon-minus-small"
                      width="24"
                      height="24"
                      className={s.iconSecond}
                    />
                  </button>
                  <span className={s.currentWater}>{values.amount} ml</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "amount",
                        Math.min(values.amount + 50, 5000)
                      )
                    }
                  >
                    <Icon
                      id="icon-plus-small"
                      width="24"
                      height="24"
                      className={s.iconSecond}
                    />
                  </button>
                </div>

                {/* час  */}
                <div className={s.wrapTime}>
                  <label className={s.labelTitleSecond}>Recording time:</label>
                  <Field type="time" name="time" className={s.timeInput} />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className={s.error}
                  />
                </div>

                {/*  вода */}
                <div className={s.wrapWater}>
                  <label className={s.labelTitle}>
                    Enter the value of the water used:
                  </label>
                  <Field
                    type="number"
                    name="amount"
                    min="50"
                    max="5000"
                    className={s.waterInput}
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className={s.error}
                  />
                </div>

                {/* Дані для збереження */}
                <div className={s.result}>
                  <span className={s.amountSave}>{values.amount} ml</span>
                  <button type="submit" className={s.saveBtn}>
                    Save
                  </button>
                </div>
                {message && <p className={s.successMessage}>{message}</p>}
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditWaterNoteModal;
