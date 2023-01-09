import * as yup from "yup";

const Schema = yup.object().shape({
  benefit: yup.string().required("required"),
  clubPlanId: yup.string().required("required"),
});

export { Schema };
