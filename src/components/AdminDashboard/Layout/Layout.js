import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import SideBar from "./SideBar/SideBar";
import NavBar from "./NavBar/NavBar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.css";

const Layout = ({
  title = "Titanium",
  description = "Titanium description",
  keywords = "description",
  url = "",
  image = "",
  children,
}) => {
  const router = useRouter();
  //get store
  const store = useSelector((store) => store.userLogin);
  const { userInfo } = store;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, [router, userInfo]);

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url}></link>
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="peppermart"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={image ? image : "defaultImaageurl"}
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="peppermart"></meta>
        <link rel="icon" href="/sample.ico" />
      </Head>

      <NavBar />
      <SideBar />
      {/*message alert  */}
      <ToastContainer
        position="top-left"
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
      <main className={`${styles.main}`}>{children}</main>
    </div>
  );
};

export default Layout;
