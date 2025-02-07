import { useEffect, useState } from "react";
import styles from "./DailyNormaModal.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../Loader/Loader.jsx";
import * as Yup from "yup";
import axios from "axios";

const DailyNormaModal = ({ onCloseDailyModal }) => {
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const INITIAL_VALUE = {
    water: "",
  };

  const dailyNormaSchema = Yup.object({
    water: Yup.number()
      .typeError("Please enter a number")
      .min(1, "Water intake must be at least 1L")
      .max(15, "Water intake cannot exceed 15L")
      .required("This field is required"),
  });

  const rawAuth = localStorage.getItem("persist:auth");
  const parsedAuth = rawAuth ? JSON.parse(rawAuth) : null;
  const token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : null;
  const userId = parsedAuth?.token ? JSON.parse(parsedAuth.userId) : null;

  useEffect(() => {
    const fetchWater = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://water-app-backend.onrender.com/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGender(data.data.gender);
      } catch (error) {
        alert(setError(error.message));
      } finally {
        setIsLoading(false);
      }
    };
    fetchWater();
  }, [token, userId]);

  const handleSubmit = async () => {};

  const calculateWaterIntake = () => {
    const M = parseFloat(weight);
    const T = parseFloat(activity);
    if (isNaN(M) || isNaN(T) || !gender) return "0";
    return gender === "woman"
      ? (M * 0.03 + T * 0.4).toFixed(2)
      : (M * 0.04 + T * 0.6).toFixed(2);
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
      {error && { error }}
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
          <p>
            For woman:{" "}
            <span className={styles.daily_norma_modal_span}>
              V=(M*0,03) + (T*0,4)
            </span>
          </p>
          <p>
            For man:{" "}
            <span className={styles.daily_norma_modal_span}>
              V=(M*0,04) + (T*0,6)
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
            <h3 className={styles.title_h3_modal}>Calculate your rate:</h3>
            <div className={styles.radio_div}>
              <label className={styles.radio_daily_modal}>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender === "woman"}
                  onChange={(e) => setGender(e.target.value)}
                />
                For woman
              </label>
              <label className={styles.radio_daily_modal}>
                <input
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender === "man"}
                  onChange={(e) => setGender(e.target.value)}
                />
                For man
              </label>
            </div>
            <label className={styles.label_daily_modal}>
              <span>Your weight in kilograms:</span>
              <input
                className={styles.input_daily_modal}
                placeholder="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <label className={styles.label_daily_modal}>
              <span>
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
            <p>
              The required amount of water in liters per day:{" "}
              <span className={styles.amount_span_daily_modal}>
                {calculateWaterIntake()} L
              </span>
            </p>
            <div>
              <label className={styles.label_daily_modal}>
                <h3 className={styles.title_h3_modal}>
                  Write down how much water you will drink:
                </h3>

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
