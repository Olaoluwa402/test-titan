import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import Spinner from "../../../asset/Lottie/29192-spinner-loader-animation.json";
import { Schema } from "./Schema";
import FormError from "../../Errors/FormError";

const AdminLogin = () => {
  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        const details = {
          email: values.email,
          password: values.password,
        };

        // dispatch(registerClubPlanAction(details));

        actions.resetForm();
      },
    });

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-titaniumOrange p-12">
      <div className="max-w-[350px] max-h-fit bg-white p-6 drop-shadow-md rounded-xl">
        <h2 className="text-center font-bold text-peppermartDark500 font-Urbanist">
          Welcome To Titanium
        </h2>
        <form
          className="my-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col my-3">
            <label
              className="text-peppermartDark500 font-Urbanist"
              htmlFor="name"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="px-3 py-1 border border-slate-200 focus:outline-0"
              onChange={handleChange}
              name="email"
              value={values.email}
              onBlur={handleBlur}
              style={{
                borderColor: errors.email && touched.email ? "#fc8181" : "",
              }}
            />
            {errors.email && touched.email && <FormError data={errors.email} />}
          </div>
          <div className="flex flex-col my-3">
            <label
              className="text-peppermartDark500 font-Urbanist"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password "
              name="password"
              className="px-3 py-1 border border-slate-200 focus:outline-0 "
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              style={{
                borderColor:
                  errors.password && touched.password ? "#fc8181" : "",
              }}
            />
            {errors.password && touched.password && (
              <FormError data={errors.password} />
            )}
          </div>

          <button className="w-full bg-titaniumOrange text-white p-3 my-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
