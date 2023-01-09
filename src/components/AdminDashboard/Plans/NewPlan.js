import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Schema } from "./Schema";
import { createclubPlanAction } from "../../../redux/actions/clubPlanActions";
import { CREATE_CLUBPLAN_RESET } from "../../../redux/constants/clubPlanConstants";
import Loader from "../../Spinner/Spinner";
import { toast } from "react-toastify";

import styles from "../../InvestmentClub/Registration/Register.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Register = ({ closeModalHandler }) => {
  const dispatch = useDispatch();

  const clubPlan = useSelector((store) => store.newClubPlan);
  const { loading: loading, success } = clubPlan;

  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_CLUBPLAN_RESET });
      toast.success("Successfully created");
    }
  }, [success, dispatch]);
  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        price: "",
        short_desc: "",
        long_desc: "",
      },

      validationSchema: Schema,

      onSubmit: (values, actions) => {
        dispatch(
          createclubPlanAction({
            title: values.title,
            price: values.price,
            short_desc: values.short_desc,
            long_desc: values.long_desc,
          })
        );

        actions.resetForm();
      },
    });

  return (
    <>
      {/* registration form */}
      <div className=" md:w-3/5 max-h-[650px] overflow-y-auto  mx-auto bg-white p-2 md:p-5 drop-shadow-md rounded-3xl relative">
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
          className="flex flex-col justify-between bg-white md:p-8 mt-3"
        >
          <div className="flex flex-col md:flex-row justify-between mb-3">
            <div className="w-full p-2">
              <div className="flex flex-col mb-3">
                <label htmlFor="title" className="mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                  value={values.title}
                  onBlur={handleBlur}
                  style={{
                    borderColor: errors.title && touched.title ? "#fc8181" : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.title && touched.title && (
                  <p className={styles.error}>{errors.title}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="price" className="mb-1">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                  onBlur={handleBlur}
                  style={{
                    borderColor: errors.price && touched.price ? "#fc8181" : "",
                  }}
                  placeholder="Enter your last name"
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.price && touched.price && (
                  <p className={styles.error}>{errors.price}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="short_desc" className="mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  id="short_desc"
                  name="short_desc"
                  onChange={handleChange}
                  value={values.short_desc}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.short_desc && touched.short_desc ? "#fc8181" : "",
                  }}
                  placeholder="Enter your last name"
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.short_desc && touched.short_desc && (
                  <p className={styles.error}>{errors.short_desc}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="long_desc" className="mb-1">
                  Long Description
                </label>
                <textarea
                  name="long_desc"
                  id="long_desc"
                  onChange={handleChange}
                  value={values.long_desc}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.long_desc && touched.long_desc ? "#fc8181" : "",
                  }}
                  cols="30"
                  rows="5"
                  placeholder="Enter friend's name phone number and email Address"
                  className="flex-1 py-3 rounded px-3 focus:outline-0  bg-titaniumGray40 border border-text-titaniumGray30"
                ></textarea>
                {errors.long_desc && touched.long_desc && (
                  <p className={styles.error}>{errors.long_desc}</p>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-[300px] md:w-[408px] mx-auto py-3 px-6 text-white font-semibold bg-titaniumOrange rounded-full"
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
