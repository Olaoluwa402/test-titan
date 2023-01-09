import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Schema } from "./Schema";
import { createPlanBenefitAction } from "../../../redux/actions/planBenefitActions";
import { CREATE_PLANBENEFIT_RESET } from "../../../redux/constants/planBenefitConstants";
import { getclubPlansAction } from "../../../redux/actions/clubPlanActions";
import Loader from "../../Spinner/Spinner";
import { toast } from "react-toastify";
import FormError from "../../Errors/FormError";

import styles from "../../InvestmentClub/Registration/Register.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Register = ({ closeModalHandler }) => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector((store) => store.newBenefit);

  const { data } = useSelector((store) => store.allClubPlans);

  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_PLANBENEFIT_RESET });
      toast.success("Successfully created");
    }
    dispatch(getclubPlansAction());
  }, [success, dispatch]);
  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        benefit: "",
        clubPlanId: "",
      },

      validationSchema: Schema,

      onSubmit: (values, actions) => {
        dispatch(
          createPlanBenefitAction({
            benefit: values.benefit,
            clubPlanId: values.clubPlanId,
          })
        );

        actions.resetForm();
      },
    });

  const clubPlans =
    data &&
    data.clubPlans &&
    data.clubPlans.length > 0 &&
    data.clubPlans.map((plan) => (
      <option key={plan.id} value={plan.id}>
        {plan.title}
      </option>
    ));

  return (
    <>
      {/* registration form */}
      <div className=" max-w-[450px] max-h-[650px] overflow-y-auto  mx-auto bg-white p-2 md:p-5 drop-shadow-md rounded-3xl relative">
        <div
          className=" flex justify-center items-center absolute top-1 right-1 cursor-pointer"
          onClick={closeModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-[100%] flex flex-col justify-between bg-white md:p-8 mt-3"
        >
          <div className="flex flex-col md:flex-row justify-between mb-3">
            <div className="w-full p-2">
              <div className="flex flex-col mb-3">
                <label htmlFor="benefit" className="mb-1">
                  Benefit
                </label>
                <input
                  type="text"
                  id="benefit"
                  name="benefit"
                  placeholder="Enter Benefit"
                  onChange={handleChange}
                  value={values.benefit}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.benefit && touched.benefit ? "#fc8181" : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.benefit && touched.benefit && (
                  <p className={styles.error}>{errors.benefit}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="clubPlanId" className="mb-1">
                  Belong to?
                </label>
                {errors.clubPlanId && touched.clubPlanId && (
                  <FormError data={errors.clubPlanId} />
                )}
                <select
                  type="select"
                  id="clubPlanId"
                  name="clubPlanId"
                  onChange={handleChange}
                  value={values.clubPlanId}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.clubPlanId && touched.clubPlanId ? "#fc8181" : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                >
                  <option value="">Select</option>
                  {clubPlans}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="max-w-[300px] md:w-[408px] mx-auto py-3 px-6 text-white font-semibold bg-titaniumOrange rounded-full"
            >
              SUBMIT
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
