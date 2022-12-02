import React from "react";
import bg from "../../asset/images/home_bg.png";
import InvestmentPlans from "./InvestmentPlans/InvestmentPlans";

import styles from "./InvestmentClub.module.css";

const InvestmentClub = () => {
  const style = {
    backgroundImage: `url(${bg.src})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerInner} style={style}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Investment club Plans</h2>
          <p className={styles.short_desc}>
            Group Housing Investment Club allows you and other investors jointly
            invest in Titaniums property development scheme.
          </p>
        </div>
        <div className={styles.overlay}></div>
      </div>

      <InvestmentPlans className={styles.investmentPlans} />
    </div>
  );
};

export default InvestmentClub;
