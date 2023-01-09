import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Schema } from "./Schema";
import { useRouter } from "next/router";

import FormError from "../../Errors/FormError";
import {
  getAboutAction,
  updateAboutAction,
} from "../../../redux/actions/generalActions";
import Loader from "../../Spinner/Spinner";
import { UPDATE_ABOUT_RESET } from "../../../redux/constants/generalConstants";
import { toast } from "react-toastify";

const About = () => {
  const dispatch = useDispatch();
  const { loading, about } = useSelector((store) => store.getAbout);

  const { loading: updateLoading, success: updateSuccess } = useSelector(
    (store) => store.updateAbout
  );

  useEffect(() => {
    dispatch(getAboutAction());
    if (updateSuccess) {
      toast.success(`update successfull`);
      dispatch({ type: UPDATE_ABOUT_RESET });
    }
  }, [dispatch, updateSuccess]);

  // formik for form
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: about && about.title ? about.title : "",
      desc: about && about.desc ? about.desc : "",
      file: "",
      image: "",
    },
    validationSchema: Schema,
    onSubmit: (values, actions) => {
      // send as form data
      let formData = new FormData();
      formData.append("image", values.file);
      formData.append("title", values.title);
      formData.append("desc", values.desc);

      dispatch(updateAboutAction(formData, about.id));

      // actions.resetForm();
    },
  });

  return (
    <>
      <div className="w-full 2xl:w-4/5 mx-auto bg-white p-6 drop-shadow-md rounded-xl">
        {/* form */}
        <form
          className="my-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-col my-3">
              <label className="text-slate-400" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="title"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="title"
                value={values.title}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.title && touched.title ? "#fc8181" : "inherit",
                }}
              />

              {errors.title && touched.title && (
                <FormError data={errors.title} />
              )}
            </div>

            {/* icon */}
            <div className="flex flex-col my-3">
              <label className=" " htmlFor="file">
                Image
              </label>
              <input
                type="file"
                placeholder="select image"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={(e) => {
                  setFieldValue("file", e.target.files[0]);
                  setFieldValue("image", e.target.value);
                }}
                name="file"
                value={values.image}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.file && touched.file ? "#fc8181" : "inherit",
                }}
              />

              {errors.file && touched.file && <FormError data={errors.file} />}
            </div>

            <div className="flex flex-col my-3">
              <label className=" " htmlFor="desc">
                Description
              </label>
              <textarea
                type="text"
                id="desc"
                placeholder="About Text"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                rows={3}
                name="desc"
                value={values.desc}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.desc && touched.desc ? "#fc8181" : "inherit",
                }}
              ></textarea>

              {errors.desc && touched.desc && <FormError data={errors.desc} />}
            </div>
          </div>

          {updateLoading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-[150px] bg-titaniumOrange text-white p-3 my-3 hover:opacity-60"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default About;
