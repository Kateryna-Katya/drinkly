import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import clsx from "clsx";

import { signinSchema, signupSchema } from "../../validation/auth.js";

import css from "./AuthForm.module.css";

import { Icon } from "../Icon/Icon.jsx";
import { SvgSprite } from "../SvgSprite/SvgSprite.jsx";

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
  const navigate = useNavigate();

  //   const dispatch = useDispatch();

  const signupHandleSubmit = (values, actions) => {
    console.log({ email: values.email, password: values.password });
    console.log("signup");

    //  dispatch(registerWater({ email: values.email, password: values.password }));
    //  actions.resetForm();
    navigate("/signin");
  };

  const signinHandleSubmit = (values, actions) => {
    console.log(values);
    console.log("signin");
    //  dispatch(registerWater(values));
    //  actions.resetForm();
    navigate("/");
  };

  return (
    <div className={clsx(css.formWrapper, signin && css.signinDeskPadding)}>
      <SvgSprite />
      <h2 className={css.title}>{signin ? "Sign In" : "Sign Up"}</h2>

      <Formik
        initialValues={signin ? signinInitialValues : signupInitialValues}
        onSubmit={signin ? signinHandleSubmit : signupHandleSubmit}
        validationSchema={signin ? signinSchema : signupSchema}
      >
        {({ touched, errors }) => (
          <Form className={css.form} noValidate>
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
      <Link className={css.link} to={signin ? "/signup" : "/signin"}>
        {signin ? "Sign Up" : "Sign In"}
      </Link>
    </div>
  );
};

export default AuthForm;
