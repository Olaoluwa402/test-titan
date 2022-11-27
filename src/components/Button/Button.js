import React from "react";

import styles from "./Button.module.css";

const Button = ({ text, bgColor, color, setModalOpen }) => {
  return (
    <button
      className={styles.btn}
      style={{ backgroundColor: bgColor, color: color }}
      onClick={() => setModalOpen((prev) => !prev)}
    >
      {text}
    </button>
  );
};

export default Button;
