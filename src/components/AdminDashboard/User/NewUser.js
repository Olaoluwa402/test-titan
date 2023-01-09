import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Loader from "../../../components/Spinner/Spinner";
import { Schema } from "./Schema";
import FormError from "../../Errors/FormError";
import { MdOutlineClose } from "react-icons/md";
import { registerUserAction } from "../../../redux/actions/userActions";
import { USER_REGISTER_RESET } from "../../../redux/constants/userConstants";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const NewUser = ({ closeModalHandler }) => {
  //   const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.userRegister);
  const { loading, success } = store;

  useEffect(() => {
    if (success) {
      toast.success(`Registration successfull, You can now login`);
      // welcome message after 5sec
      dispatch({
        type: USER_REGISTER_RESET,
      });
    }
  }, [dispatch, router, success]);

  // formik for form
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Schema,
      onSubmit: (values, actions) => {
        const details = {
          email: values.email,
          password: values.password,
          role: values.role,
        };

        dispatch(
          registerUserAction({
            email: details.email,
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
          onClick={closeModalHandler}
        >
          <MdOutlineClose className="text-[30px]" />
        </div>
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
                borderColor:
                  errors.email && touched.email ? "#fc8181" : "inherit",
              }}
            />

            {errors.email && touched.email && <FormError data={errors.email} />}
          </div>
          <div className="flex flex-col my-3">
            <label
              className="text-peppermartDark500 font-Urbanist"
              htmlFor="role"
            >
              Role
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
                  errors.password && touched.password ? "#fc8181" : "inherit",
              }}
            />
            {errors.password && touched.password && (
              <FormError data={errors.password} />
            )}
          </div>

          <div className="flex flex-col my-3">
            <label
              className="text-peppermartDark500 font-Urbanist"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password "
              name="confirmPassword"
              className="px-3 py-1 border border-slate-200 focus:outline-0 "
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
              style={{
                borderColor:
                  errors.confirmPassword && touched.confirmPassword
                    ? "#fc8181"
                    : "inherit",
              }}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <FormError data={errors.confirmPassword} />
            )}
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="w-full bg-titaniumOrange text-white p-3 my-3 hover:opacity-60"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default NewUser;
