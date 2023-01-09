import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Loader from "../../Spinner/Spinner";
import { Schema } from "./Schema";
import FormError from "../../Errors/FormError";
import { MdOutlineClose } from "react-icons/md";
import { getPropertiesAction } from "../../../redux/actions/propertiesActions";
import { createFloorPlanAction } from "../../../redux/actions/floorPlanActions";
import { CREATE_FLOORPLAN_RESET } from "../../../redux/constants/floorPlanConstants";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const NewFloorPlan = ({ setOpen, closeModalHandler }) => {
  //   const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.newFloorPlan);
  const { loading, success } = store;

  const propertyStore = useSelector((store) => store.properties);
  const { data } = propertyStore;

  useEffect(() => {
    if (success) {
      toast.success(`successfull`);
      // welcome message after 5sec
      dispatch({
        type: CREATE_FLOORPLAN_RESET,
      });
    }

    dispatch(getPropertiesAction());
  }, [dispatch, router, success]);

  // formik for form
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      image: "",
      file: null,
      title: "",
      propertyId: "",
    },
    validationSchema: Schema,
    onSubmit: (values, actions) => {
      // send as form data
      let formData = new FormData();
      formData.append("image", values.file);
      formData.append("title", values.title);
      formData.append("propertyId", values.propertyId);
      console.log(formData);
      dispatch(createFloorPlanAction(formData));
      // actions.resetForm();
    },
  });

  const properties =
    data &&
    data.properties &&
    data.properties.length > 0 &&
    data.properties.map((property) => (
      <option key={property.id} value={property.id}>
        {property.sub_title}
      </option>
    ));

  return (
    <>
      {/* form */}
      <div className="max-w-[600px] max-h-[620px] bg-white p-6 drop-shadow-md rounded-xl relative overflow-y-auto">
        <div
          className=" flex justify-center items-center absolute top-1 right-1 cursor-pointer"
          onClick={closeModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>
        <h2 className="text-center font-bold text-peppermartDark500 font-Urbanist mt-[20px]">
          New Floor Plan
        </h2>
        <form
          className="my-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-col my-3">
              <label className=" " htmlFor="title">
                Name
              </label>
              <input
                type="text"
                id="title"
                placeholder="Floor plan title"
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
              <label className=" " htmlFor="name">
                Image
              </label>
              <input
                type="file"
                placeholder="select facility Icon"
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

            {/* onMassaionnete */}

            <div className="flex flex-col mb-3">
              <label htmlFor="propertyId" className="mb-1">
                Belong to?
              </label>
              {errors.propertyId && touched.propertyId && (
                <FormError data={errors.propertyId} />
              )}
              <select
                type="select"
                id="propertyId"
                name="propertyId"
                onChange={handleChange}
                value={values.propertyId}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.propertyId && touched.propertyId ? "#fc8181" : "",
                }}
                className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              >
                <option value="">Select</option>
                {properties}
              </select>
            </div>
            {/* property */}
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-full bg-titaniumOrange text-white p-3 my-3 hover:opacity-60"
            >
              Create
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default NewFloorPlan;
