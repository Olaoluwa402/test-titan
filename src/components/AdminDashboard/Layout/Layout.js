import React from "react";
import Head from "next/head";
import SideBar from "./SideBar/SideBar";
import NavBar from "./NavBar/NavBar";
import styles from "./Layout.module.css";

const Layout = ({
  title = "Peppermart",
  description = "peppermart description",
  keywords = "description",
  url = "",
  image = "",
  children,
}) => {
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
      <main className={`${styles.main}`}>{children}</main>
    </div>
  );
};

export default Layout;
