import * as Yup from "yup";

export const signupSchema = Yup.object({
  email: Yup.string().email("Incorrect email").required("Required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .max(64, "Less than 64 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .min(8, "At least 8 characters")
    .max(64, "Less than 64 characters")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});

export const signinSchema = Yup.object({
  email: Yup.string().email("Incorrect email").required("Required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .max(64, "Less than 64 characters")
    .required("Required"),
});

export const sendEmailSchema = Yup.object({
  email: Yup.string().email("Incorrect email").required("Required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "At least 8 characters")
    .max(64, "Less than 64 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .min(8, "At least 8 characters")
    .max(64, "Less than 64 characters")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});
