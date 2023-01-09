import React, { useState, useEffect } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import bg from "../../../asset/images/home_bg.png";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import { Schema } from "./Schema";
import { createMemberAction } from "../../../redux/actions/memberActions";
import { getclubPlansAction } from "../../../redux/actions/clubPlanActions";
import { CREATE_MEMBER_RESET } from "../../../redux/constants/memberConstants";
import Loader from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";

import styles from "../../InvestmentClub/Registration/Register.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Register = ({ closeModalHandler }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  const store = useSelector((store) => store.allClubPlans);
  const { loading, data } = store;

  const member = useSelector((store) => store.newMember);
  const { loading: loadingRegisterMember, success } = member;

  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_MEMBER_RESET });
      toast.success("Successfully created");
    }
    dispatch(getclubPlansAction());
  }, [success, dispatch]);
  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        maritalStatus: "",
        employmentStatus: "",
        phone: "",
        jobTitle: "",
        clubMembership: "",
        aboutUs: "",
        refer_friend: "",
      },

      validationSchema: Schema,

      onSubmit: (values, actions) => {
        const details = {
          firstname: values.firstName,
          lastname: values.lastName,
          job_title: values.jobTitle,
          email: values.email,
          phone: values.phone,
          marital_Status: values.maritalStatus,
          employment_status: values.employmentStatus,
          clubPlanId: values.clubMembership,
          heard_about: values.aboutUs,
          refer_friend: values.refer_friend,
        };

        dispatch(createMemberAction(details));

        actions.resetForm();
      },
    });

  //club plans
  const selectClubPlan =
    data &&
    data.clubPlans.length > 0 &&
    data.clubPlans.map((item) => (
      <option key={item.id} value={item.id}>
        ${item.price}
      </option>
    ));
  return (
    <>
      {/* registration form */}
      <div className=" md:w-4/5 max-h-[650px] overflow-y-auto  mx-auto bg-white p-2 md:p-5 drop-shadow-md rounded-3xl relative">
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
            <div className="w-full p-2 md:w-1/2">
              <div className="flex flex-col mb-3">
                <label htmlFor="firstName" className="mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.firstName && touched.firstName ? "#fc8181" : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.firstName && touched.firstName && (
                  <p className={styles.error}>{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="lastName" className="mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.lastName && touched.lastName ? "#fc8181" : "",
                  }}
                  placeholder="Enter your last name"
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.lastName && touched.lastName && (
                  <p className={styles.error}>{errors.lastName}</p>
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
                  <p className={styles.error}>{errors.email}</p>
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
                  <p className={styles.error}>{errors.phone}</p>
                )}
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="maritalStatus" className="mb-1">
                  Marital Status
                </label>
                <select
                  type="select"
                  id="maritalStatus"
                  name="maritalStatus"
                  onChange={handleChange}
                  value={values.maritalStatus}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.maritalStatus && touched.maritalStatus
                        ? "#fc8181"
                        : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                >
                  <option value=""> Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="engaged">Engaged</option>
                </select>

                {errors.maritalStatus && touched.maritalStatus && (
                  <p className={styles.error}>{errors.maritalStatus}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="employmentStatus" className="mb-1">
                  Employment Status
                </label>
                <select
                  type="select"
                  id="employmentStatus"
                  name="employmentStatus"
                  onChange={handleChange}
                  value={values.employmentStatus}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.employmentStatus && touched.employmentStatus
                        ? "#fc8181"
                        : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                >
                  <option value="">Select Status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="employer">Employer</option>
                </select>
                {errors.employmentStatus && touched.employmentStatus && (
                  <p className={styles.error}>{errors.employmentStatus}</p>
                )}
              </div>
            </div>
            <div className="w-full p-2 md:w-1/2">
              <div className="flex flex-col mb-3">
                <label htmlFor="jobTitle" className="mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  onChange={handleChange}
                  value={values.jobTitle}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.jobTitle && touched.jobTitle ? "#fc8181" : "",
                  }}
                  placeholder="Enter your job title"
                  className="flex-1 py-3 rounded px-3 px-6 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                />
                {errors.jobTitle && touched.jobTitle && (
                  <p className={styles.error}>{errors.jobTitle}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="clubMembership" className="mb-1">
                  Club Membership
                </label>
                {errors.clubMembership && touched.clubMembership && (
                  <p className={styles.error}>{errors.clubMembership}</p>
                )}
                <select
                  type="select"
                  id="clubMembership"
                  name="clubMembership"
                  onChange={handleChange}
                  value={values.clubMembership}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.clubMembership && touched.clubMembership
                        ? "#fc8181"
                        : "",
                  }}
                  className="flex-1 py-3 px-6 rounded px-3 focus:outline-0 bg-titaniumGray40 border border-text-titaniumGray30"
                >
                  <option value="">Select your club membership</option>
                  {selectClubPlan}
                </select>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="date" className="mb-1">
                  Join Date
                </label>
                <div className="flex py-3 px-6 rounded px-3 bg-titaniumGray40 border border-text-titaniumGray30">
                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    // timeClassName={handleColor}

                    className="px-6 w-full  focus:outline-0 bg-inherit border border-0"
                  />
                  <FaRegCalendarAlt className="text-[20px]" />
                </div>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="aboutUs" className="mb-1">
                  How did you hear about us
                </label>
                {errors.aboutUs && touched.aboutUs && (
                  <p className={styles.error}>{errors.aboutUs}</p>
                )}
                <select
                  type="select"
                  id="aboutUs"
                  name="aboutUs"
                  onChange={handleChange}
                  value={values.aboutUs}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.aboutUs && touched.aboutUs ? "#fc8181" : "",
                  }}
                  className="flex-1 py-3 rounded px-3 focus:outline-0 px-6 bg-titaniumGray40 border border-text-titaniumGray30"
                >
                  <option value="">Select</option>
                  <option value="friend">Friend</option>
                  <option value="company">Company</option>
                  <option value="social-media">Social Media</option>
                  <option value="email">Email</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="referral" className="mb-1">
                  Refer a friend
                </label>
                <textarea
                  name="refer_friend"
                  id="referral"
                  onChange={handleChange}
                  value={values.refer_friend}
                  onBlur={handleBlur}
                  style={{
                    borderColor:
                      errors.refer_friend && touched.refer_friend
                        ? "#fc8181"
                        : "",
                  }}
                  cols="30"
                  rows="5"
                  placeholder="Enter friend's name phone number and email Address"
                  className="flex-1 py-3 rounded px-3 focus:outline-0 px-6 bg-titaniumGray40 border border-text-titaniumGray30"
                ></textarea>
                {errors.refer_friend && touched.refer_friend && (
                  <p className={styles.error}>{errors.refer_friend}</p>
                )}
              </div>
            </div>
          </div>

          {loadingRegisterMember ? (
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
