import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Loader from "../../Spinner/Spinner";
import { Schema } from "./SchemaEdit";
import { MdOutlineClose } from "react-icons/md";

import { UPDATE_CLUBPLAN_RESET } from "../../../redux/constants/clubPlanConstants";
import {
  updateClubPlanAction,
  getClubPlanDetailAction,
} from "../../../redux/actions/clubPlanActions";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const EditMember = ({ setOpen, id, closeEditModalHandler }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.updateClubPlan);
  const { loading, success } = store;

  const { clubplan } = useSelector((store) => store.clubPlanDetail);

  useEffect(() => {
    if (success) {
      toast.success(`update successfull`);
      // welcome message after 5sec
      dispatch({
        type: UPDATE_CLUBPLAN_RESET,
      });
    }
  }, [dispatch, router, success, setOpen]);

  useEffect(() => {
    if ((id && !clubplan) || (clubplan && clubplan.clubPlan.id != id)) {
      dispatch(getClubPlanDetailAction({ id }));
    }
  }, [dispatch, id, clubplan]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        title:
          clubplan && clubplan.clubPlan.title ? clubplan.clubPlan.title : "",
        price:
          clubplan && clubplan.clubPlan.price ? clubplan.clubPlan.price : "",
        short_desc:
          clubplan && clubplan.clubPlan.short_desc
            ? clubplan.clubPlan.short_desc
            : "",
        long_desc:
          clubplan && clubplan.clubPlan.long_desc
            ? clubplan.clubPlan.long_desc
            : "",
      },

      validationSchema: Schema,

      onSubmit: (values, actions) => {
        dispatch(
          updateClubPlanAction({
            id: id,
            title: values.title,
            price: values.price,
            short_desc: values.short_desc,
            long_desc: values.long_desc,
          })
        );
      },
    });

  return (
    <>
      {/* form */}
      <div className="max-w-[600px] max-h-[620px] bg-white p-6 drop-shadow-md rounded-xl relative overflow-y-auto">
        <div
          className=" flex justify-center items-center absolute top-1 right-1 cursor-pointer"
          onClick={closeEditModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>
        <h2 className="text-center font-bold text-peppermartDark500 font-Urbanist mt-[20px]">
          Edit Plan
        </h2>
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
              Edit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditMember;
