import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const Schema = yup.object().shape({
  video_url: yup.string(),
  file: yup
    .mixed()
    .nullable()
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
  title: yup.string(),
  sub_title: yup.string(),
  description: yup.string(),
  pricing: yup.number(),
  short_desc: yup.string(),
  location: yup.string(),
  no_of_beds: yup.number(),
  area: yup.number(),
  parking_space: yup.number(),
  no_of_baths: yup.number(),
});

export { Schema };
