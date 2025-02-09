import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Formik, Form } from "formik";
import clsx from "clsx";

import { signinSchema, signupSchema } from "../../validation/auth.js";
import {
  currenthUser,
  signinUser,
  signupUser,
} from "../../redux/auth/operations.js";
import { selectAuthLoading } from "../../redux/auth/selectors.js";

import css from "./AuthForm.module.css";

import Loader from "../Loader/Loader.jsx";
import { Icon } from "../Icon/Icon.jsx";

const signupInitialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

const signinInitialValues = {
  email: "",
  password: "",
};

const AuthForm = ({ signin }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRepeatPasswordShown, setIsRepeatPasswordShown] = useState(false);
  const loading = useSelector(selectAuthLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupHandleSubmit = async (values, actions) => {
    try {
      await dispatch(
        signupUser({ email: values.email, password: values.password })
      ).unwrap();

      actions.resetForm();
      navigate("/signin");
    } catch (error) {
      if (error.status === 400) {
        toast.error("Check entered data");
        return;
      }
      toast.error(error.data.message);
    }
  };

  const signinHandleSubmit = async (values, actions) => {
    try {
      const { email, password } = values;
      await dispatch(signinUser({ email, password })).unwrap();
      actions.resetForm();
      dispatch(currenthUser());
      navigate("/home");
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        toast.error("Wrong email or password");
        return;
      }
      toast.error(error.data.message);
    }
  };

  return (
    <div className={clsx(css.formWrapper, signin && css.signinDeskPadding)}>
      <h2 className={css.title}>{signin ? "Sign In" : "Sign Up"}</h2>
      {loading && <Loader />}

      <Formik
        initialValues={signin ? signinInitialValues : signupInitialValues}
        onSubmit={signin ? signinHandleSubmit : signupHandleSubmit}
        validationSchema={signin ? signinSchema : signupSchema}
      >
        {({ touched, errors }) => (
          <Form className={css.form}>
            <label>
              <span className={css.labelText}>Enter your email</span>
              <Field
                className={clsx({
                  [css.error]: errors.email && touched.email,
                })}
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                className={css.errorMessage}
                name="email"
                component="span"
              />
            </label>
            <label>
              <span className={css.labelText}>Enter your password</span>
              <Field
                className={clsx({
                  [css.error]: errors.password && touched.password,
                })}
                type={isPasswordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <button
                type="button"
                className={css.eyeButton}
                onClick={() => setIsPasswordShown(!isPasswordShown)}
              >
                {isPasswordShown ? (
                  <Icon width={16} height={16} id={"icon-eye"} />
                ) : (
                  <Icon width={16} height={16} id={"icon-eye-slash"} />
                )}
              </button>
              <ErrorMessage
                className={css.errorMessage}
                name="password"
                component="span"
              />
            </label>
            {!signin && (
              <label>
                <span className={css.labelText}>Repeat password</span>
                <Field
                  className={clsx({
                    [css.error]:
                      errors.repeatPassword && touched.repeatPassword,
                  })}
                  type={isRepeatPasswordShown ? "text" : "password"}
                  name="repeatPassword"
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={() =>
                    setIsRepeatPasswordShown(!isRepeatPasswordShown)
                  }
                >
                  {isRepeatPasswordShown ? (
                    <Icon width={16} height={16} id={"icon-eye"} />
                  ) : (
                    <Icon width={16} height={16} id={"icon-eye-slash"} />
                  )}
                </button>
                <ErrorMessage
                  className={css.errorMessage}
                  name="repeatPassword"
                  component="span"
                />
              </label>
            )}
            <button className={css.btn} type="submit">
              {signin ? "Sign In" : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
      {signin && (
        <Link className={css.link} to="/auth/reset-password">
          Forgot password?
        </Link>
      )}
      <Link className={css.link} to={signin ? "/signup" : "/signin"}>
        {signin ? "Sign Up" : "Sign In"}
      </Link>
    </div>
  );
};

export default AuthForm;
