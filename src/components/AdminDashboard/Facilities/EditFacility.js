import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik, setFieldValue } from "formik";
import Loader from "../../Spinner/Spinner";
import { Schema } from "./SchemaEdit";
import FormError from "../../Errors/FormError";
import { MdOutlineClose } from "react-icons/md";

import { UPDATE_FACILITY_RESET } from "../../../redux/constants/facilityConstants";
import { getPropertiesAction } from "../../../redux/actions/propertiesActions";
import {
  updateFacilityAction,
  getFacilityDetailAction,
} from "../../../redux/actions/facilitiesActions";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const EditFacility = ({ setOpen, id, closeEditModalHandler }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.updateFacility);
  const { loading, success } = store;

  const { facility } = useSelector((store) => store.facilityDetail);

  const propertyStore = useSelector((store) => store.properties);
  const { data } = propertyStore;

  useEffect(() => {
    if (success) {
      toast.success(`update successfull`);
      // welcome message after 5sec
      dispatch({
        type: UPDATE_FACILITY_RESET,
      });
    }
    dispatch(getPropertiesAction());
  }, [dispatch, router, success, setOpen]);

  useEffect(() => {
    if ((id && !facility) || (facility && facility.facility.id != id)) {
      dispatch(getFacilityDetailAction({ id }));
    }
  }, [dispatch, id, facility]);

  const properties =
    data &&
    data.properties &&
    data.properties.length > 0 &&
    data.properties.map((property) => (
      <option key={property.id} value={property.id}>
        {property.sub_title}
      </option>
    ));

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
      image: "",
      file: null,
      title: facility && facility.facility.title ? facility.facility.title : "",
      onMaissonete: "",
      propertyId: "",
    },
    validationSchema: Schema,
    onSubmit: (values, actions) => {
      // send as form data
      let formData = new FormData();
      formData.append("icon", values.file);
      formData.append("title", values.title);
      formData.append("onMaissonete", values.onMaissonete);
      formData.append("propertyId", values.propertyId);

      dispatch(updateFacilityAction(formData, id));
      //   actions.resetForm();
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
          Edit Facility
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
                placeholder="Facility  Name"
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
                Icon
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
              <label htmlFor="onMaissonete" className="mb-1">
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
            <div className="flex flex-col mb-3">
              <label htmlFor="onMaissonete" className="mb-1">
                others (OPTIONAL)
              </label>

              {errors.onMaissonete && touched.onMaissonete && (
                <FormError data={errors.onMaissonete} />
              )}
              <select
                type="select"
                id="onMaissonete"
                name="onMaissonete"
                onChange={handleChange}
                value={values.onMaissonete}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.onMaissonete && touched.onMaissonete
                      ? "#fc8181"
                      : "",
                }}
                className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
              >
                <option value="">Select</option>
                <option value="maissonete">Maissonete</option>
                <option value="typicalfloor">Typical Floor</option>
              </select>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-full bg-titaniumOrange text-white p-3 my-3 hover:opacity-60"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditFacility;
