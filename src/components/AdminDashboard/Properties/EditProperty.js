import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik, setFieldValue } from "formik";
import Loader from "../../../components/Spinner/Spinner";
import { Schema } from "./SchemaEdit";
import FormError from "../../Errors/FormError";
import { MdOutlineClose } from "react-icons/md";
import {
  updatePropertyAction,
  getPropertyDetailAction,
} from "../../../redux/actions/propertiesActions";
import { UPDATE_PROPERTY_RESET } from "../../../redux/constants/propertiesConstants";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const EditProperty = ({ setOpen, id, closeEditModalHandler }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.updateProperty);
  const { loading, success } = store;

  const { property } = useSelector((store) => store.propertyDetail);

  useEffect(() => {
    if (success) {
      toast.success(`update successfull`);
      // welcome message after 5sec
      dispatch({
        type: UPDATE_PROPERTY_RESET,
      });
    }
  }, [dispatch, router, success, setOpen]);

  useEffect(() => {
    if ((id && !property) || (property && property.property.id != id)) {
      dispatch(getPropertyDetailAction({ id }));
    }
  }, [dispatch, id, property]);

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
      video_url:
        property && property.property.video_url
          ? property.property.video_url
          : "",
      image: "",
      file: null,
      title: property && property.property.title ? property.property.title : "",
      sub_title:
        property && property.property.sub_title
          ? property.property.sub_title
          : "",
      description:
        property && property.property.description
          ? property.property.description
          : "",
      pricing:
        property && property.property.pricing ? property.property.pricing : "",
      short_desc:
        property && property.property.short_desc
          ? property.property.short_desc
          : "",
      location:
        property && property.property.location
          ? property.property.location
          : "",
      no_of_beds:
        property && property.property.no_of_beds
          ? Number(property.property.no_of_beds)
          : "",
      area:
        property && property.property.area
          ? Number(property.property.area)
          : "",
      parking_space:
        property && property.property.parking_space
          ? Number(property.property.parking_space)
          : "",
      no_of_baths:
        property && property.property.no_of_baths
          ? Number(property.property.no_of_baths)
          : "",
    },
    validationSchema: Schema,
    onSubmit: (values, actions) => {
      // send as form data
      let formData = new FormData();
      formData.append("video_url", values.video_url);
      formData.append("image", values.file);
      formData.append("title", values.title);
      formData.append("sub_title", values.sub_title);
      formData.append("pricing", values.pricing);
      formData.append("short_desc", values.short_desc);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("no_of_beds", values.no_of_beds);
      formData.append("area", values.area);
      formData.append("parking_space", values.parking_space);
      formData.append("no_of_baths", values.no_of_baths);

      dispatch(updatePropertyAction(formData, id));
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
          Edit Property
        </h2>
        <form
          className="my-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col my-3 md:mr-3">
              <label className=" " htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Property Title"
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
            <div className="flex flex-col my-3">
              <label className=" " htmlFor="sub_title">
                Sub Title
              </label>
              <input
                type="text"
                id="sub_title"
                placeholder="Property sub title"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="sub_title"
                value={values.sub_title}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.sub_title && touched.sub_title
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.sub_title && touched.sub_title && (
                <FormError data={errors.sub_title} />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col my-1 md:mr-3">
              <label className=" " htmlFor="name">
                Video Id
              </label>
              <input
                type="text"
                placeholder="Enter youtube video Id"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="video_url"
                value={values.video_url}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.video_url && touched.video_url
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.video_url && touched.video_url && (
                <FormError data={errors.video_url} />
              )}
            </div>
            <div className="flex flex-col my-1">
              <label className=" " htmlFor="name">
                Image
              </label>
              <input
                type="file"
                placeholder="Enter youtube video Id"
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
          </div>

          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col my-1 md:mr-3">
              <label className=" " htmlFor="pricing">
                Pricing
              </label>
              <input
                type="text"
                id="pricing"
                placeholder="eg. 5000"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="pricing"
                value={values.pricing}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.pricing && touched.pricing ? "#fc8181" : "inherit",
                }}
              />

              {errors.pricing && touched.pricing && (
                <FormError data={errors.pricing} />
              )}
            </div>
            <div className="flex flex-col my-1">
              <label className=" " htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Property location description"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="location"
                value={values.location}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.location && touched.location ? "#fc8181" : "inherit",
                }}
              />

              {errors.location && touched.location && (
                <FormError data={errors.location} />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col my-1 md:mr-3">
              <label className=" " htmlFor="no_of_beds">
                No of Beds
              </label>
              <input
                type="number"
                id="no_of_beds"
                placeholder="eg. 5"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="no_of_beds"
                value={values.no_of_beds}
                onBlur={handleBlur}
                min={1}
                style={{
                  borderColor:
                    errors.no_of_beds && touched.no_of_beds
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.no_of_beds && touched.no_of_beds && (
                <FormError data={errors.no_of_beds} />
              )}
            </div>
            <div className="flex flex-col my-1">
              <label className=" " htmlFor="area">
                Area
              </label>
              <input
                type="number"
                id="area"
                placeholder="eg. 80 meter square"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="area"
                value={values.area}
                onBlur={handleBlur}
                min={1}
                style={{
                  borderColor:
                    errors.area && touched.area ? "#fc8181" : "inherit",
                }}
              />

              {errors.area && touched.area && <FormError data={errors.area} />}
            </div>
          </div>

          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col my-1 md:mr-3">
              <label className=" " htmlFor="parking_space">
                Parking Space
              </label>
              <input
                type="number"
                id="parking_space"
                placeholder="eg. 5"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="parking_space"
                value={values.parking_space}
                min={1}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.parking_space && touched.parking_space
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.parking_space && touched.parking_space && (
                <FormError data={errors.parking_space} />
              )}
            </div>
            <div className="flex flex-col my-1">
              <label className=" " htmlFor="no_of_baths">
                No of Bathrooms
              </label>
              <input
                type="number"
                id="no_of_baths"
                placeholder="eg. 5"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="no_of_baths"
                value={values.no_of_baths}
                onBlur={handleBlur}
                min={1}
                style={{
                  borderColor:
                    errors.no_of_baths && touched.no_of_baths
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.no_of_baths && touched.no_of_baths && (
                <FormError data={errors.no_of_baths} />
              )}
            </div>
          </div>

          <div className="flex flex-col my-1">
            <label className=" " htmlFor="short_desc">
              Short Description
            </label>
            <textarea
              type="text"
              id="short_desc"
              placeholder="Enter short description"
              className="px-3 py-1 border border-slate-200 focus:outline-0"
              onChange={handleChange}
              name="short_desc"
              value={values.short_desc}
              onBlur={handleBlur}
              style={{
                borderColor:
                  errors.short_desc && touched.short_desc
                    ? "#fc8181"
                    : "inherit",
              }}
            ></textarea>

            {errors.short_desc && touched.short_desc && (
              <FormError data={errors.short_desc} />
            )}
          </div>

          <div className="flex flex-col my-1">
            <label className=" " htmlFor="description">
              Long Description
            </label>
            <textarea
              type="text"
              id="description"
              placeholder="Enter short description"
              className="px-3 py-1 border border-slate-200 focus:outline-0"
              onChange={handleChange}
              name="description"
              value={values.description}
              onBlur={handleBlur}
              style={{
                borderColor:
                  errors.description && touched.description
                    ? "#fc8181"
                    : "inherit",
              }}
              rows={10}
            ></textarea>

            {errors.description && touched.description && (
              <FormError data={errors.description} />
            )}
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

export default EditProperty;
