import { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Icon } from "../Icon/Icon.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthLoading, selectUser } from "../../redux/auth/selectors.js";
import { updateUser, updateUserPhoto } from "../../redux/auth/operations.js";
import * as Yup from "yup";
import css from "./Setting.module.css";
import Loader from "../Loader/Loader.jsx";

Modal.setAppElement("#root");

const Setting = ({ onClose }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);

  const initialValues = {
    gender: user?.gender === "Man" ? "Man" : "Woman",
    name: user.name || user.email.charAt(0).toUpperCase(),
    email: user.email,
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
    photo: user.photo || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),

    outdatedPassword: Yup.string().test(
      "require-old-password",
      "Old password is required",
      function (value) {
        const { newPassword, repeatNewPassword } = this.parent;
        if ((newPassword || repeatNewPassword) && !value) {
          return false;
        }
        return true;
      }
    ),

    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .test(
        "require-new-password",
        "New password is required",
        function (value) {
          const { outdatedPassword } = this.parent;
          if (outdatedPassword && !value) {
            return false;
          }
          return true;
        }
      ),

    repeatNewPassword: Yup.string()
      .test(
        "require-repeat-password",
        "Repeat new password is required",
        function (value) {
          const { newPassword } = this.parent;
          if (newPassword && !value) {
            return false;
          }
          return true;
        }
      )
      .test("match-passwords", "Passwords must match", function (value) {
        const { newPassword } = this.parent;
        if (newPassword && value !== newPassword) {
          return false;
        }
        return true;
      }),
  });

  const handlePhotoUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    setPhotoFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const requestData = {
        ...values,
        oldPassword: values.outdatedPassword,
      };
      if (photoFile !== null) {
        requestData.photo = photoFile;
      }
      delete requestData.outdatedPassword;
      delete requestData.repeatNewPassword;

      const formData = new FormData();
      formData.append("gender", requestData.gender);
      formData.append("name", requestData.name);
      formData.append("email", requestData.email);
      formData.append("oldPassword", requestData.oldPassword);
      formData.append("newPassword", requestData.newPassword);

      if (photoFile !== null) {
        formData.append("photo", requestData.photo);
      }

      const resultAction = await dispatch(updateUser(formData));

      if (updateUser.fulfilled.match(resultAction)) {
        await dispatch(updateUserPhoto());

        onClose();
      } else {
        const errorResponse = resultAction.payload || {
          message: "Something went wrong",
        };

        const errorMessage =
          typeof errorResponse === "string"
            ? errorResponse
            : errorResponse.message;

        if (errorMessage.includes("Invalid current password")) {
          setFieldError("outdatedPassword", "Incorrect old password");
        } else if (errorMessage.includes("New password must be different")) {
          setFieldError(
            "newPassword",
            "New password must not match the old one"
          );
        } else {
          console.error(errorMessage);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const passwordVisibilityToggle = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        className={css.modalContent}
        overlayClassName={css.modalOverlay}
      >
        <h2 className={css.title}>Setting</h2>
        <button className={css.closeButton} onClick={onClose}>
          <Icon className={css.closeIcon} id="icon-cross" />
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <div className={css.settingContainer}>
                <label className={css.photoLabel}>Your photo</label>
                <div className={css.photoLabelContainer}>
                  {values.photo ? (
                    <img
                      src={values.photo}
                      alt="User"
                      className={css.photoPreview}
                    />
                  ) : (
                    <div className={css.avatarFallback}>
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className={css.aploadPhotoContainer}>
                    <button
                      type="button"
                      className={css.uploadButton}
                      onClick={() =>
                        document.getElementById("fileUpload").click()
                      }
                    >
                      <Icon className={css.photoIcon} id="icon-arrow-up-tray" />
                      Upload a photo
                    </button>
                    <input
                      id="fileUpload"
                      type="file"
                      className={css.hiddenInput}
                      onChange={(e) => handlePhotoUpload(e, setFieldValue)}
                    />
                  </div>
                </div>
              </div>

              <div className={css.formContainer}>
                <div className={css.leftContainer}>
                  <div
                    className={`${css.settingContainer} ${css.containerForMargin}`}
                  >
                    <label className={css.genderLabel}>
                      Your gender identity
                    </label>
                    <div>
                      <label className={css.genderRadio}>
                        <Field
                          type="radio"
                          name="gender"
                          value="Woman"
                          checked={values.gender === "Woman"}
                        />
                        <span className={css.genderSpan}>Woman</span>
                      </label>
                      <label className={css.genderRadio}>
                        <Field
                          type="radio"
                          name="gender"
                          value="Man"
                          checked={values.gender === "Man"}
                        />
                        <span className={css.genderSpan}>Man</span>
                      </label>
                    </div>
                  </div>

                  <div className={css.settingContainer}>
                    <label className={css.nameLabel}>Your name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className={`${css.inputs} ${
                        errors.name && touched.name ? css.error : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={css.errorMessage}
                    />
                  </div>

                  <div className={css.settingContainer}>
                    <label className={css.emailLabel}>E-mail</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={css.inputs}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={css.errorMessage}
                    />
                  </div>
                </div>

                <div className={css.rightContainer}>
                  <div className={css.settingContainer}>
                    <label className={css.passwordLabel}>Password</label>
                    {[
                      "outdatedPassword",
                      "newPassword",
                      "repeatNewPassword",
                    ].map((field, index) => (
                      <div key={index} className={css.fieldContainer}>
                        <label htmlFor={field} className={css.fieldLabel}>
                          {field === "outdatedPassword"
                            ? "Outdated password"
                            : field === "newPassword"
                            ? "New password"
                            : "Repeat new password"}
                        </label>
                        <div className={css.inputWithIcon}>
                          <Field
                            id={field}
                            name={field}
                            type={
                              passwordVisibility[field] ? "text" : "password"
                            }
                            className={`${css.inputs} ${
                              errors[field] && touched[field] ? css.error : ""
                            }`}
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            className={css.iconButton}
                            onClick={() => passwordVisibilityToggle(field)}
                          >
                            <Icon
                              className={css.passwordIcon}
                              id={
                                passwordVisibility[field]
                                  ? "icon-eye"
                                  : "icon-eye-slash"
                              }
                            />
                          </button>
                        </div>
                        <ErrorMessage
                          name={field}
                          component="div"
                          className={css.errorMessage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" className={css.saveBtn}>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Setting;
