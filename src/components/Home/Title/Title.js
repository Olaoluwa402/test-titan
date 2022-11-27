import React from "react";
import styles from "./Title.module.css";

const Title = ({ children }) => {
  return (
    <div className={styles.titlecontainer}>
      <h2 className={styles.title}>{children}</h2>
      <hr className="my-4 w-[80px] h-[4px] bg-titaniumOrange border-0 dark:bg-gray-700" />
    </div>
  );
};

export default Title;
