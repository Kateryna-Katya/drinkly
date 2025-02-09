import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import clsx from "clsx";
import { ErrorMessage, Field, Formik, Form } from "formik";

import AuthPagesWrapper from "../../components/AuthPagesWrapper/AuthPagesWrapper";
import { Icon } from "../../components/Icon/Icon";

import { resetPasswordSchema, sendEmailSchema } from "../../validation/auth";

import css from "./ForgotPasswordPage.module.css";
import Loader from "../../components/Loader/Loader";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRepeatPasswordShown, setIsRepeatPasswordShown] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const sendEmailValues = {
    email: "",
  };

  const resetPasswordValues = {
    password: "",
    repeatPassword: "",
  };

  const onSendEmail = async (values, actions) => {
    setIsLoading(true);
    try {
      await axios.post("auth/request-reset-password", values);
      actions.resetForm();
      toast.success(
        "Email sent! Check your inbox and click the link to reset your password.",
        {
          duration: 10000,
        }
      );
    } catch (error) {
      if (error.status === 400 || error.status === 404) {
        toast.error("This email is not registered");
        return;
      }
      toast.error(error.response.data.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async (values, actions) => {
    setIsLoading(true);
    try {
      await axios.post("auth/reset-password", {
        password: values.password,
        token,
      });
      actions.resetForm();
      toast.success("Your password has been changed", {
        duration: 10000,
      });
      navigate("/signin");
    } catch (error) {
      toast.error(error.response.data.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPagesWrapper>
      {isLoading && <Loader />}
      <div className={css.formWrapper}>
        <h2 className={css.title}>
          {token ? "Set your new password" : "Reset Your Password"}
        </h2>
        <Formik
          initialValues={!token ? sendEmailValues : resetPasswordValues}
          onSubmit={!token ? onSendEmail : onResetPassword}
          validationSchema={!token ? sendEmailSchema : resetPasswordSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className={css.form}>
                {!token ? (
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
                ) : (
                  <>
                    <label>
                      <span className={css.labelText}>Enter new password</span>
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
                    <label>
                      <span className={css.labelText}>Repeat new password</span>
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
                  </>
                )}
                <button className={css.btn} type="submit">
                  {token ? "Get New Password" : "Send Email"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthPagesWrapper>
  );
};

export default ForgotPasswordPage;
