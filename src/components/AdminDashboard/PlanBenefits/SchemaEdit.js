import * as yup from "yup";

const Schema = yup.object().shape({
  benefit: yup.string(),
  clubPlanId: yup.string(),
});

export { Schema };
