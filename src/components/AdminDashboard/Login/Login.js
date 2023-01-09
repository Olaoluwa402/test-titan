import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Loader from "../../../components/Spinner/Spinner";
import { Schema } from "./Schema";
import FormError from "../../Errors/FormError";
import { loginUserAction } from "../../../redux/actions/userActions";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const welcomeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.userLogin);
  const { loading, userInfo } = store;

  useEffect(() => {
    if (
      (userInfo && userInfo.role === "admin") ||
      (userInfo && userInfo.role === "super-admin")
    ) {
      toast(`Welcome back ${userInfo.email}`, { type: "success" });
      // welcome message after 5sec

      welcomeRef.current = setTimeout(() => {
        router.push("/admin");
      }, 6000);
    }
    if (userInfo && userInfo.role === "client") {
      toast(`Welcome back ${userInfo.email}`, { type: "success" });
      // welcome message after 5sec

      welcomeRef.current = setTimeout(() => {
        router.push("/");
      }, 6000);
    }

    // clear setTimeout
    return () => {
      clearInterval(welcomeRef.current);
    };
  }, [dispatch, router, userInfo]);

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

        dispatch(
          loginUserAction({ email: details.email, password: details.password })
        );

        actions.resetForm();
      },
    });

  return (
    <>
      {/*message alert  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

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
                  borderColor:
                    errors.email && touched.email ? "#fc8181" : "inherit",
                }}
              />
              {errors.email && touched.email && (
                <FormError data={errors.email} />
              )}
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

            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="w-full bg-titaniumOrange text-white p-3 my-3 hover:opacity-60"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
