import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Loader from "../../Spinner/Spinner";
import { Schema } from "./SchemaEdit";
import { MdOutlineClose } from "react-icons/md";

import { UPDATE_MEMBER_RESET } from "../../../redux/constants/memberConstants";
import { getPropertiesAction } from "../../../redux/actions/propertiesActions";
import {
  updateMemberAction,
  getMemberDetailAction,
} from "../../../redux/actions/memberActions";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const EditMember = ({ setOpen, id, closeEditModalHandler }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.updateMember);
  const { loading, success } = store;

  const { member } = useSelector((store) => store.memberDetail);

  const propertyStore = useSelector((store) => store.properties);
  const { data } = propertyStore;

  useEffect(() => {
    if (success) {
      toast.success(`update successfull`);
      // welcome message after 5sec
      dispatch({
        type: UPDATE_MEMBER_RESET,
      });
    }
    dispatch(getPropertiesAction());
  }, [dispatch, router, success, setOpen]);

  useEffect(() => {
    if ((id && !member) || (member && member.member.id != id)) {
      dispatch(getMemberDetailAction({ id }));
    }
  }, [dispatch, id, member]);

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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        firstName:
          member && member.member.firstname ? member.member.firstname : "",
        lastName:
          member && member.member.lastname ? member.member.lastname : "",
        phone: member && member.member.phone ? member.member.phone : "",
      },

      validationSchema: Schema,

      onSubmit: (values, actions) => {
        const details = {
          firstname: values.firstName,
          lastname: values.lastName,
          phone: values.phone,
        };
        console.log(details, "details");
        dispatch(updateMemberAction(details));
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
          Edit Membership detail
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col justify-between bg-white md:p-8 mt-3"
        >
          <div className="flex flex-col md:flex-row justify-between mb-3">
            <div className="w-full p-2 ">
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
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-[300px] md:w-[408px] mx-auto py-3 px-6 text-white font-semibold bg-titaniumOrange rounded-full"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditMember;
