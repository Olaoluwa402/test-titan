import * as yup from "yup";

const Schema = yup.object().shape({
  title: yup.string().required("required"),
  fullName: yup.string().required("required"),
  email: yup.string().required("required"),
  phone: yup.number().required("required"),
  agreement: yup.string().required("required"),
});

export { Schema };
