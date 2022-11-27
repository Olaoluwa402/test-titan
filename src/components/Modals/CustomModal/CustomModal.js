import React from "react";

import styles from "./CustomModal.module.css";

const CustomModal = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default CustomModal;
