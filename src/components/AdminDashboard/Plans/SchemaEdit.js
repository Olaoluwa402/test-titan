import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Schema = yup.object().shape({
  title: yup.string(),
  price: yup.string(),
  short_desc: yup
    .string()
    .min(10, "Too short")
    .max(100, "Maximun of 150 characters"),
  long_desc: yup.string(),
});

export { Schema };
