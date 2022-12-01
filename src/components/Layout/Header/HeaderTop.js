import React from "react";
import { useSelector } from "react-redux";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

import styles from "./HeaderTop.module.css";

const HeaderTop = () => {
  const settings = useSelector((store) => store.homeData);
  const { data } = settings;
  return (
    <div className={styles.container}>
      <div className={`${styles.topBar} wrapper-80`}>
        <ul className={styles.topBarSocial}>
          <li>
            <Link href="/">
              <a>
                <FaFacebook
                  className={`${styles.topIcons} ${styles.faFaceBook}`}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <FaLinkedin
                  className={`${styles.topIcons} ${styles.faLinkedin}`}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <AiFillTwitterCircle
                  className={`${styles.topIcons} ${styles.aiFillTwitter}`}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <AiFillInstagram
                  className={`${styles.topIcons} ${styles.aiFillInstagram}`}
                />
              </a>
            </Link>
          </li>
        </ul>

        <ul className={styles.topBarContact}>
          <li className={styles.topBarContact__items}>
            <FaEnvelope className={`${styles.topIcons}`} />
            <span>
              {data && data.settings && data.settings[0].email
                ? data.settings[0].email
                : ""}
            </span>
          </li>
          <li className={styles.topBarContact__items}>
            <FaPhoneAlt className={`${styles.topIcons}`} />
            <span>
              {data && data.settings && data.settings[0].phone
                ? data.settings[0].phone
                : ""}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
