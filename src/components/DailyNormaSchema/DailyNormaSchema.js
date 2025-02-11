import * as Yup from "yup";

export const dailyNormaSchema = Yup.object({
  water: Yup.number()
    .typeError("Water intake must be a valid number")
    .min(1, "Water intake must be at least 1L")
    .max(15, "Water intake cannot exceed 15L")
    .required("Water intake is required"),
});
