import React from "react";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import styles from "./InvestmentPlans.module.css";

const InvestmentPlans = () => {
  const store = useSelector((store) => store.clubPlans);
  const { loading, plans } = store;

  if (plans) {
    console.log(plans);
  }

  return (
    <div className={`${styles.container}`}>
      {plans && plans.clubPlans && plans.clubPlans.length > 0 ? (
        plans.clubPlans.map((plan) => (
          <div key={plan.id} className={styles.card}>
            <div
              className={`${styles.cardHeader} ${
                plan.title === "silver"
                  ? "cardHeaderSilver"
                  : plan.title === "gold"
                  ? "cardHeaderGold"
                  : "cardHeaderDiamond"
              } `}
            >
              <h4>{plan.title}</h4>
              <h5 className={styles.pricing}>${plan.price}</h5>
              <p className={styles.cardHeadertext}>{plan.short_desc} </p>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardBodytext}>{plan.long_desc}</p>
              <ul className={styles.features}>
                {plan.benefits &&
                  plan.benefits.length > 0 &&
                  plan.benefits.map((benefit) => (
                    <li key={benefit.id}>
                      <div className={styles.iconWrapper}>
                        <FaCheck className={styles.icons} />
                      </div>
                      <span>{benefit.benefit}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <Link href="/investment_club/register">
              <a>
                <div className={styles.cardFooter_cta}>
                  <button>Get Started</button>
                </div>
              </a>
            </Link>
          </div>
        ))
      ) : (
        <h2>No Plan Yet</h2>
      )}
    </div>
  );
};

export default InvestmentPlans;
