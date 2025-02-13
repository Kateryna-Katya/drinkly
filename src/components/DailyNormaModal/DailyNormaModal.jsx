import { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { dailyNormaSchema } from "../DailyNormaSchema/DailyNormaSchema.js";

import styles from "./DailyNormaModal.module.css";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";
import axios from "axios";
import { useRefresh } from "../useRefresh.js";

const DailyNormaModal = ({ onCloseDailyModal, userWaterRate, waterNew }) => {
  const token = useSelector((state) => state.auth.token);
  const userGender = useSelector((state) => state.auth.user.gender);
  const { refresh, triggerRefresh } = useRefresh();

  const [gender, setGender] = useState(userGender);
  const [weight, setWeight] = useState(0);
  const [activity, setActivity] = useState(0);
  const [required, setRequired] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateWaterIntake = (weight, activity) => {
    const M = parseFloat(weight);
    const T = parseFloat(activity);
    if (isNaN(M) || isNaN(T) || !gender) return "0";
    return gender === "woman"
      ? (M * 0.03 + T * 0.4).toFixed(2)
      : (M * 0.04 + T * 0.6).toFixed(2);
  };

  useEffect(() => {
    if (gender.toLowerCase() === "woman") {
      setRequired(Number(weight * 0.03 + activity * 0.4));
    } else if (gender.toLowerCase() === "man") {
      setRequired(Number(weight * 0.04 + activity * 0.6));
    }
  }, [weight, activity, gender]);

  const INITIAL_VALUE = {
    water: waterNew / 1000,
  };

  const handleSubmit = async (values) => {
    triggerRefresh();
    try {
      setIsLoading(true);
      setError(null);

      const payload = {
        waterRate: values.water * 1000,
      };

      const response = await axios.patch(
        "https://water-app-backend.onrender.com/water/daily-norm",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      userWaterRate(values.water * 1000);
      onCloseDailyModal();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseDailyModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onCloseDailyModal]);

  const onBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseDailyModal();
    }
  };

  return (
    <div onClick={onBackDropClick} className={styles.backdrop}>
      {isLoading && <Loader />}
      <div className={styles.daily_norma_modal}>
        <div className={styles.daily_title_btn_modal}>
          <h2 className={styles.title_daily_modal}>My daily norma</h2>
          <button
            className={styles.btn_close_daily_modal}
            type="button"
            onClick={onCloseDailyModal}
          >
            <Icon
              id="icon-cross"
              width="24"
              height="24"
              className={styles.iconClose}
            />
          </button>
        </div>
        <div className={styles.daily_norma_modal_formula}>
          <p className={styles.daily_norma_madal_gender}>
            For woman:{" "}
            <span className={styles.daily_norma_modal_span}>
              V=(M*0.03) + (T*0.4)
            </span>
          </p>
          <p className={styles.daily_norma_madal_gender}>
            For man:{" "}
            <span className={styles.daily_norma_modal_span}>
              V=(M*0.04) + (T*0.6)
            </span>
          </p>
        </div>
        <p className={styles.formula_text_daily_modal}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports, or another type of activity
          commensurate in terms of loads (in the absence of these, you must set
          0)
        </p>

        <Formik
          initialValues={INITIAL_VALUE}
          onSubmit={handleSubmit}
          validationSchema={dailyNormaSchema}
        >
          <Form className={styles.form_daily_modal}>
            <p className={styles.title_daily_modal_calc}>
              Calculate your rate:
            </p>
            <div className={styles.radio_div}>
              <label className={styles.radio_daily_modal}>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender.toLowerCase() === "woman"}
                  onChange={(e) => setGender(e.target.value)}
                />
                For woman
              </label>
              <label className={styles.radio_daily_modal}>
                <input
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender.toLowerCase() === "man"}
                  onChange={(e) => setGender(e.target.value)}
                />
                For man
              </label>
            </div>
            <label className={styles.label_daily_modal}>
              <span className={styles.daily_modal_weight}>
                Your weight in kilograms:
              </span>
              <input
                className={styles.input_daily_modal}
                placeholder="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <label className={styles.label_daily_modal}>
              <span className={styles.daily_modal_time}>
                The time of active participation in sports or other activities
                with a high physical. load in hours:
              </span>
              <input
                className={styles.input_daily_modal}
                placeholder="0"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </label>
            <p className={styles.daily_modal_amount_of_water}>
              The required amount of water in liters per day:{" "}
              <span className={styles.amount_span_daily_modal}>
                {required} L
              </span>
            </p>
            <div>
              <label className={styles.label_daily_modal}>
                <p className={styles.title_daily_modal_water_rate}>
                  Write down how much water you will drink:
                </p>
                <Field
                  type="text"
                  name="water"
                  className={styles.input_daily_modal}
                  placeholder="0"
                />
                <ErrorMessage
                  component="div"
                  className={styles.errorMessage}
                  name="water"
                />
              </label>
            </div>
            <button className={styles.btn_save_daily_modal} type="submit">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default DailyNormaModal;
