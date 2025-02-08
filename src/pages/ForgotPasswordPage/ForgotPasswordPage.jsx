import { useSearchParams } from "react-router-dom";
import AuthPagesWrapper from "../../components/AuthPagesWrapper/AuthPagesWrapper";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { resetPasswordSchema, sendEmailSchema } from "../../validation/auth";

import css from "./ForgotPasswordPage.module.css";
import clsx from "clsx";
import { Icon } from "../../components/Icon/Icon";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRepeatPasswordShown, setIsRepeatPasswordShown] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const sendEmailValues = {
    email: "",
  };

  const resetPasswordValues = {
    password: "",
    repeatPassword: "",
  };

  const onSendEmail = () => {};
  const onResetPassword = () => {};

  return (
    <AuthPagesWrapper>
      <div className={css.formWrapper}>
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
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthPagesWrapper>
  );
};

export default ForgotPasswordPage;
