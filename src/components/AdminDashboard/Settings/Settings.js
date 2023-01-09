import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Schema } from "./Schema";
import { useRouter } from "next/router";

import FormError from "../../Errors/FormError";
import {
  getSettingAction,
  updateSettingAction,
} from "../../../redux/actions/settingActions";
import Loader from "../../Spinner/Spinner";
import { UPDATE_SETTING_RESET } from "../../../redux/constants/settingConstants";
import { toast } from "react-toastify";

const Settings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, setting } = useSelector((store) => store.settingDetail);

  const { loading: updateLoading, success: updateSuccess } = useSelector(
    (store) => store.updateSetting
  );

  useEffect(() => {
    dispatch(getSettingAction());
    if (updateSuccess) {
      toast.success(`update successfull`);
      dispatch({ type: UPDATE_SETTING_RESET });
    }
  }, [dispatch, updateSuccess]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        phone: setting && setting.phone ? setting.phone : "",
        email: setting && setting.email ? setting.email : "",
        getQuoteCTA: setting && setting.getQuoteCTA ? setting.getQuoteCTA : "",
        selectLocationPlaceholder:
          setting && setting.selectLocationPlaceholder
            ? setting.selectLocationPlaceholder
            : "",
        selectBedroomAmountPlaceholder:
          setting && setting.selectBedroomAmountPlaceholder
            ? setting.selectBedroomAmountPlaceholder
            : "",
        selectPropertyPlaceholder:
          setting && setting.selectPropertyPlaceholder
            ? setting.selectPropertyPlaceholder
            : "",
        selectPriceRangePlaceholder:
          setting && setting.selectPriceRangePlaceholder
            ? setting.selectPriceRangePlaceholder
            : "",
        company_address:
          setting && setting.company_address ? setting.company_address : "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        dispatch(
          updateSettingAction({
            id: setting.id,
            phone: values.phone,
            email: values.email,
            getQuoteCTA: values.getQuoteCTA,
            selectLocationPlaceholder: values.selectLocationPlaceholder,
            selectBedroomAmountPlaceholder:
              values.selectBedroomAmountPlaceholder,
            selectPropertyPlaceholder: values.selectPropertyPlaceholder,
            selectPriceRangePlaceholder: values.selectPriceRangePlaceholder,
            company_address: values.company_address,
          })
        );
        // actions.resetForm();
      },
    });

  const aboutHandler = () => {
    router.push("/admin/about");
  };

  const featureHandler = () => {
    router.push("/admin/property_features");
  };
  const imageHandler = () => {
    router.push("/admin/property_images");
  };
  const advantageHandler = () => {
    router.push("/admin/property_added_advantages");
  };
  const floorPlanHandler = () => {
    router.push("/admin/property_floor_plans");
  };

  return (
    <>
      <div className="w-full 2xl:w-4/5 mx-auto bg-white p-6 drop-shadow-md rounded-xl">
        <div className="flex items-center my-3 bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          <button
            onClick={aboutHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 mr-3 bg-dark text-white cursor-pointer"
          >
            About
          </button>

          <button
            onClick={aboutHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 mr-3 bg-dark text-white cursor-pointer"
          >
            Menu Item
          </button>
          <button
            onClick={featureHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 mr-3 bg-dark text-white cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={imageHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 mr-3 bg-dark text-white cursor-pointer"
          >
            Sliders
          </button>
          <button
            onClick={advantageHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 mr-3 bg-dark text-white cursor-pointer"
          >
            Vision
          </button>
          <button
            onClick={floorPlanHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 mr-3 bg-dark text-white cursor-pointer"
          >
            Value
          </button>
        </div>
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
              <label className="text-slate-400" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="email"
                value={values.email}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.email && touched.email ? "#fc8181" : "inherit",
                }}
              />

              {errors.email && touched.email && (
                <FormError data={errors.email} />
              )}
            </div>

            <div className="flex flex-col my-3">
              <label className="text-slate-400" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="phone"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="phone"
                value={values.phone}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.phone && touched.phone ? "#fc8181" : "inherit",
                }}
              />

              {errors.phone && touched.phone && (
                <FormError data={errors.phone} />
              )}
            </div>

            <div className="flex flex-col my-3">
              <label className="text-slate-400" htmlFor="company_address">
                company address
              </label>
              <input
                type="company_address"
                id="company_address"
                placeholder="company_address"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="company_address"
                value={values.company_address}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.company_address && touched.company_address
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.company_address && touched.company_address && (
                <FormError data={errors.company_address} />
              )}
            </div>

            <div className="flex flex-col my-3">
              <label className="text-slate-400" htmlFor="getQuoteCTA">
                get Quote CTA
              </label>
              <input
                type="getQuoteCTA"
                id="getQuoteCTA"
                placeholder="getQuoteCTA"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="getQuoteCTA"
                value={values.getQuoteCTA}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.getQuoteCTA && touched.getQuoteCTA
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.getQuoteCTA && touched.getQuoteCTA && (
                <FormError data={errors.getQuoteCTA} />
              )}
            </div>

            <div className="flex flex-col my-3">
              <label
                className="text-slate-400"
                htmlFor="selectLocationPlaceholder"
              >
                select Location Placeholder
              </label>
              <input
                type="selectLocationPlaceholder"
                id="selectLocationPlaceholder"
                placeholder="selectLocationPlaceholder"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="selectLocationPlaceholder"
                value={values.selectLocationPlaceholder}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.selectLocationPlaceholder &&
                    touched.selectLocationPlaceholder
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.selectLocationPlaceholder &&
                touched.selectLocationPlaceholder && (
                  <FormError data={errors.selectLocationPlaceholder} />
                )}
            </div>

            <div className="flex flex-col my-3">
              <label
                className="text-slate-400"
                htmlFor="selectLocationPlaceholder"
              >
                select Bedroom Amount Placeholder
              </label>
              <input
                type="selectLocationPlaceholder"
                id="selectLocationPlaceholder"
                placeholder="selectLocationPlaceholder"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="selectLocationPlaceholder"
                value={values.selectLocationPlaceholder}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.selectLocationPlaceholder &&
                    touched.selectLocationPlaceholder
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.selectLocationPlaceholder &&
                touched.selectLocationPlaceholder && (
                  <FormError data={errors.selectLocationPlaceholder} />
                )}
            </div>

            <div className="flex flex-col my-3">
              <label
                className="text-slate-400"
                htmlFor="selectPropertyPlaceholder"
              >
                select Property Placeholder
              </label>
              <input
                type="selectPropertyPlaceholder"
                id="selectPropertyPlaceholder"
                placeholder="selectPropertyPlaceholder"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="selectPropertyPlaceholder"
                value={values.selectPropertyPlaceholder}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.selectPropertyPlaceholder &&
                    touched.selectPropertyPlaceholder
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.selectPropertyPlaceholder &&
                touched.selectPropertyPlaceholder && (
                  <FormError data={errors.selectPropertyPlaceholder} />
                )}
            </div>

            <div className="flex flex-col my-3">
              <label
                className="text-slate-400"
                htmlFor="selectPriceRangePlaceholder"
              >
                select Price Range Placeholder
              </label>
              <input
                type="selectPriceRangePlaceholder"
                id="selectPriceRangePlaceholder"
                placeholder="selectPriceRangePlaceholder"
                className="px-3 py-1 border border-slate-200 focus:outline-0"
                onChange={handleChange}
                name="selectPriceRangePlaceholder"
                value={values.selectPriceRangePlaceholder}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    errors.selectPriceRangePlaceholder &&
                    touched.selectPriceRangePlaceholder
                      ? "#fc8181"
                      : "inherit",
                }}
              />

              {errors.selectPriceRangePlaceholder &&
                touched.selectPriceRangePlaceholder && (
                  <FormError data={errors.selectPriceRangePlaceholder} />
                )}
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

export default Settings;
