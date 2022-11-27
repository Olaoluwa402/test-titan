import * as yup from "yup";

//number
//yup.number().positive().integer().required()
//password
//yup.string().min(5).matches('regx',{message:'Please create a secure password'}).required()
//confirm password
//yup.string().oneOf([yup.ref('password', null)], pls provide password)
//const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Schema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("pls provide a valid email").required("required"),
  maritalStatus: yup.string().required("required"),
  employmentStatus: yup.string().required("required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  jobTitle: yup.string().required("required"),
  clubMembership: yup.string().required("required"),
  //   joinDate: yup.string().required("required"),
  aboutUs: yup.string().required("required"),
  refer_friend: yup.string(),
});

export { Schema };
