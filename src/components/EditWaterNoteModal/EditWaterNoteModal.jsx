import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./EditWaterNoteModal.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  fetchWaterRecord,
  updateWaterRecord,
} from "../../redux/water/operations";
import {
  selectWaterRecord,
  selectWaterError,
  selectWaterLoading,
} from "../../redux/water/selectors";

const EditWaterNoteModal = ({ isOpen, onClose, recordId }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const waterRecord = useSelector(selectWaterRecord);
  const loading = useSelector(selectWaterLoading);
  const error = useSelector(selectWaterError);

  const [message, setMessage] = useState("");

  const [initialValues, setInitialValues] = useState({
    amount: 250,
    time: "07:00",
  });

  console.log(waterRecord);

  useEffect(() => {
    if (recordId) {
      dispatch(fetchWaterRecord(recordId));
    }
  }, [dispatch, recordId]);

  useEffect(() => {
    if (waterRecord) {
      setInitialValues({
        amount: waterRecord.waterVolume || 250,
        time: waterRecord.time || "07:00",
      });
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

  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(50, "Minimum is 50 ml")
      .max(5000, "Maximum is 5000 ml")
      .required("Required"),
    time: Yup.string().required("Time is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
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

    dispatch(updateWaterRecord({ recordId, updatedData }))
      .unwrap()
      .then(() => {
        setMessage("Changes saved successfully!");
        setTimeout(() => {
          setMessage("");
          onClose();
        }, 2000);
      })
      .catch((error) => {
        console.error("Update error:", error);
        setMessage("Failed to update record.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <span className={s.wrapFirst}>
          <h2>Edit the entered amount of water</h2>
          <button type="button" className={s.closeBtn} onClick={onClose}>
            <svg width="14" height="14">
              <use xlinkHref={`#${"icon-icon-close"}`}></use>
            </svg>
          </button>
        </span>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Formik
          initialValues={initialValues}
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

                  <span className={s.amount}>{values.amount} ml</span>
                  <span className={s.time}>{values.time}</span>
                </div>

                {/* Кнопки  */}
                <label className={s.labelTitle}>Correct entered data:</label>
                <h4>Amount of water:</h4>
                <div className={s.waterAmountBtnBox}>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("amount", Math.max(values.amount - 50, 50))
                    }
                  >
                    <svg className={s.iconSecond}>
                      <use xlinkHref={`#${"icon-icon-menos"}`}></use>
                    </svg>
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
                    <svg className={s.iconSecond}>
                      <use xlinkHref={`#${"icon-Vector-plus"}`}></use>
                    </svg>
                  </button>
                </div>

                {/* Час  */}
                <div className={s.wrapTime}>
                  <label className={s.labelTitleSecond}>Recording time:</label>
                  <Field type="time" name="time" className={s.timeInput} />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className={s.error}
                  />
                </div>

                {/* Вода*/}
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

                {/* дані для зміни */}
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
