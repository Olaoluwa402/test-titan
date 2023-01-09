import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const Schema = yup.object().shape({
  email: yup.string(),
  phone: yup.string(),
  getQuoteCTA: yup.string(),
});

export { Schema };
