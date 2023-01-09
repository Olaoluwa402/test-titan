import React, { useState } from "react";
import Head from "next/head";
import Header from "./Header/Header";
import SideDrawer from "../SideDrawer/SideDrawer";
import Footer from "./Footer/Footer";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Layout.module.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Layout = ({
  title = "Titanium",
  description = "Titanium description",
  keywords = "titanium",
  url = "",
  image = "",
  children,
}) => {
  const [SideDrawerOpen, setSideDrawerOpen] = useState(false);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prevState) => !prevState);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;
  if (SideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <>
      <Head>
        {/* <title>{title} - 9jaclinic</title> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url}></link>
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="titanium"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={image ? image : "defaultImaageurl"}
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="titanium"></meta>
        <link rel="icon" href="/sample.ico" />
      </Head>
      <Header
        drawerToggleClickHandler={drawerToggleClickHandler}
        SideDrawerOpen={SideDrawerOpen}
      />
      <SideDrawer show={SideDrawerOpen} setSideDrawerOpen={setSideDrawerOpen} />
      {backdrop}
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
      <main className={`${styles.main}`}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
