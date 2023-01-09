import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const Schema = yup.object().shape({
  role: yup.string(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a secure password" }),
});

export { Schema };
