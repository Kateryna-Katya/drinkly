import { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Icon } from "../Icon/Icon.jsx";
import * as Yup from "yup";
import css from "./Setting.module.css";

Modal.setAppElement("#root");

const Setting = ({ user, onClose }) => {
  const [photoPreview, setPhotoPreview] = useState(user.photo || "");

  const initialValues = {
    gender: user.gender || "Woman",
    name: user.name || "",
    email: user.email || "",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),

    outdatedPassword: Yup.string().test(
      "outdatedPasswordRequired",
      "Outdated password is required",
      function (value) {
        const { newPassword, repeatNewPassword } = this.parent;
        return !(newPassword || repeatNewPassword) || !!value;
      }
    ),

    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .test(
        "newPasswordRequired",
        "New password is required",
        function (value) {
          const { outdatedPassword, repeatNewPassword } = this.parent;
          return !(outdatedPassword || repeatNewPassword) || !!value;
        }
      ),

    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .test(
        "repeatNewPasswordRequired",
        "Repeat new password is required",
        function (value) {
          const { outdatedPassword, newPassword } = this.parent;
          return !(outdatedPassword || newPassword) || !!value;
        }
      ),
  });

  const handlePhotoUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    alert("Profile updated successfully!");
    onClose();
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
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            {/* Фото */}
            <div className={css.settingContainer}>
              <label className={css.photoLabel}>Your photo</label>
              <div className={css.photoLabelContainer}>
                <img
                  src={photoPreview}
                  alt="User"
                  className={css.photoPreview}
                />
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
              {/* Гендер */}
              <div className={css.leftContainer}>
                <div
                  className={`${css.settingContainer} ${css.containerForMargin}`}
                >
                  <label className={css.genderLabel}>
                    Your gender identity
                  </label>
                  <div>
                    <label className={css.genderRadio}>
                      <Field type="radio" name="gender" value="Woman" />
                      <span className={css.genderSpan}>Woman</span>
                    </label>
                    <label className={css.genderRadio}>
                      <Field type="radio" name="gender" value="Man" />{" "}
                      <span className={css.genderSpan}>Man</span>
                    </label>
                  </div>
                </div>

                {/* Имя */}
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

                {/* Email */}
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
              {/* Пароль */}
              <div className={css.rightContainer}>
                <div className={css.settingContainer}>
                  <label className={css.passwordLabel}>Password</label>
                  {["outdatedPassword", "newPassword", "repeatNewPassword"].map(
                    (field, index) => (
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
                              className={css.closeIcon}
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
                    )
                  )}
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
  );
};

export default Setting;
