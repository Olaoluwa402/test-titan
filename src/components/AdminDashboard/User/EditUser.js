import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Loader from "../../Spinner/Spinner";
import { Schema } from "./SchemaEdit";
import FormError from "../../Errors/FormError";
import { MdOutlineClose } from "react-icons/md";
import { updateUserAction } from "../../../redux/actions/userActions";
import { UPDATE_USER_RESET } from "../../../redux/constants/userConstants";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const EditUser = ({ id, closeEditModalHandler }) => {
  //   const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.updateUser);
  const { loading, success } = store;

  useEffect(() => {
    if (success) {
      toast.success(`update successfull`);
      // welcome message after 5sec
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, success]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        role: "",
        password: "",
        previousPassword: "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        const details = {
          previousPassword: values.previousPassword,
          password: values.password,
          role: values.role,
        };

        dispatch(
          updateUserAction({
            id,
            previousPassword: values.previousPassword,
            password: details.password,
            role: details.role,
          })
        );

        actions.resetForm();
      },
    });

  return (
    <>
      {/* form */}
      <div className="max-w-[350px] max-h-fit bg-white p-6 drop-shadow-md rounded-xl relative">
        <div
          className=" flex justify-center items-center absolute top-1 right-1 cursor-pointer"
          onClick={closeEditModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>
        <h2 className="text-center font-bold text-peppermartDark500 font-Urbanist">
          Edit User
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
              htmlFor="role"
            >
              Change Role
            </label>
            <select
              type="select"
              name="role"
              className="px-3 py-1 border border-slate-200 focus:outline-0 "
              onChange={handleChange}
              value={values.role}
              onBlur={handleBlur}
              style={{
                borderColor:
                  errors.role && touched.role ? "#fc8181" : "inherit",
              }}
            >
              <option value="">Select Role</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && touched.role && <FormError data={errors.role} />}
          </div>

          <div className="flex flex-col my-3">
            <label
              className="text-peppermartDark500 font-Urbanist"
              htmlFor="previousPassword"
            >
              Previous Password
            </label>
            <input
              type="password"
              placeholder="Enter Previous Password "
              name="previousPassword"
              className="px-3 py-1 border border-slate-200 focus:outline-0 "
              onChange={handleChange}
              value={values.previousPassword}
              onBlur={handleBlur}
              style={{
                borderColor:
                  errors.previousPassword && touched.previousPassword
                    ? "#fc8181"
                    : "inherit",
              }}
            />
            {errors.previousPassword && touched.previousPassword && (
              <FormError data={errors.previousPassword} />
            )}
          </div>

          <div className="flex flex-col my-3">
            <label
              className="text-peppermartDark500 font-Urbanist"
              htmlFor="password"
            >
              Change Password
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
                  errors.password && touched.password ? "#fc8181" : "inherit",
              }}
            />
            {errors.password && touched.password && (
              <FormError data={errors.password} />
            )}
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-full bg-titaniumOrange text-white p-3 my-3 hover:opacity-60"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditUser;
