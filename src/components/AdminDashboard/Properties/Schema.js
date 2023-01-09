import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const Schema = yup.object().shape({
  video_url: yup.string(),
  file: yup
    .mixed()
    .nullable()
    .required("Pls upload file")
    .test(
      "FILE_SIZE",
      "Uploaded file is too large, must be below 400kb",
      (value) => !value || (value && value.size <= 400000)
    )
    .test(
      "FILE_FORMAT",
      "Unsupported File Format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  title: yup.string().required("required"),
  sub_title: yup.string().required("required"),
  description: yup.string().required("required"),
  pricing: yup.number().required("required"),
  short_desc: yup.string().required("required"),
  location: yup.string().required("required"),
  no_of_beds: yup.number().required("required"),
  area: yup.number().required("required"),
  parking_space: yup.number().required("required"),
  no_of_baths: yup.number().required("required"),
});

export { Schema };
