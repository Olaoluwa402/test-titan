import React, { useEffect } from "react";
import Loader from "../../Spinner/Spinner";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { Schema } from "./Schema";
import FormError from "../../Errors/FormError";
import { toast } from "react-toastify";
import { createQuoteAction } from "../../../redux/actions/QuoteActions";
import { CREATE_QUOTE_RESET } from "../../../redux/constants/QuoteConstants";

const CreateQuote = ({ closeModalHandler }) => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector((state) => state.newQuote);

  useEffect(() => {
    if (success) {
      toast.success(
        "Thank you for requesting a quote from us. We will get across to you",
        { position: "top-center", autoClose: 10000 }
      );
      dispatch({ type: CREATE_QUOTE_RESET });
    }
  }, [dispatch, success]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        email: "",
        phone: "",
        fullName: "",
        agreement: "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        // send as form data
        dispatch(
          createQuoteAction({
            title: values.title,
            email: values.email,
            phone: values.phone,
            fullName: values.fullName,
            agreement: values.agreement,
          })
        );
        actions.resetForm();
      },
    });

  //close the get quote form modal
  const closeQuoteHandler = () => {
    dispatch({
      type: "CLOSE",
    });
  };

  return (
    <div className="container w-full md:w-[450px] mx-auto bg-white p-2 md:p-5 drop-shadow-md relative rounded-3xl overflow-auto">
      <div
        className=" flex justify-center items-center absolute top-3 right-3 cursor-pointer"
        onClick={closeQuoteHandler}
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
                placeholder="Enter your title"
                onChange={handleChange}
                value={values.title}
                onBlur={handleBlur}
                style={{
                  borderColor: errors.title && touched.title ? "#fc8181" : "",
                }}
                className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              />

              {errors.title && touched.title && (
                <FormError data={errors.title} />
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="fullName" className="mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={handleChange}
                value={values.fullName}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.fullName && touched.fullName ? "#fc8181" : "",
                }}
                placeholder="Enter your full name"
                className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              />

              {errors.fullName && touched.fullName && (
                <FormError data={errors.fullName} />
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="email" className="mb-1">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                style={{
                  borderColor: errors.email && touched.email ? "#fc8181" : "",
                }}
                placeholder="Enter your email address"
                className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              />

              {errors.email && touched.email && (
                <FormError data={errors.email} />
              )}
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="phone" className="mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                onBlur={handleBlur}
                style={{
                  borderColor: errors.phone && touched.phone ? "#fc8181" : "",
                }}
                placeholder="Enter your phone address"
                className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              />

              {errors.phone && touched.phone && (
                <FormError data={errors.phone} />
              )}
            </div>
            <div className="flex  mb-3">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                onChange={handleChange}
                value={values.agreement}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.agreement && touched.agreement ? "#fc8181" : "",
                }}
                className="flex-1 py-3 rounded px-3 mr-1 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              />
              <label htmlFor="agreement" className="mb-1 text-[12px]">
                I accept the User Agreement,{" "}
                <span className="text-titaniumOrange">cookie</span> and{" "}
                <span className="text-titaniumOrange">privacy policy</span>
              </label>
            </div>
            {errors.agreement && touched.agreement && (
              <FormError data={errors.agreement} />
            )}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="w-[100%] mx-auto py-3 px-6 text-white font-semibold bg-titaniumOrange rounded-full hover:opacity-60"
          >
            SUBMIT
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateQuote;
