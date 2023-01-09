import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Schema = yup.object().shape({
  title: yup.string().required("required"),
  price: yup.string().required("required"),
  short_desc: yup
    .string()
    .min(10, "Too short")
    .max(100, "Maximun of 150 characters")
    .required("required"),
  long_desc: yup.string().required("required"),
});

export { Schema };
