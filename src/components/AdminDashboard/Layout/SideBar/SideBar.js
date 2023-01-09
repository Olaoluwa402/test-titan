import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import logo from "../../../../asset/images/titanium-logo.png";
import Image from "next/image";
import { CiLogout, CiHome, CiSettings } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdRememberMe, MdOutlineRequestQuote } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import styles from "./SideBar.module.css";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { logout } from "../../../../redux/actions/userActions";
import { FcTreeStructure, FcHome } from "react-icons/fc";

const SideBar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.container}>
      {/* logo */}
      <div className={styles.logoContainer}>
        <Link href="/" passHref>
          <a className={styles.logo}>
            <Image src={logo} alt="peppermart" />
          </a>
        </Link>
      </div>

      {/* items */}
      <div className={styles.itemsContainer}>
        <ul>
          <li>
            <Link href="/admin" passHref>
              <a>
                <CiHome className={`${styles.icons} ${styles.homeIcon}`} />
              </a>
            </Link>
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/members" passHref>
              <a>
                <MdRememberMe
                  className={`${styles.icons} ${styles.orderIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin/members">
              <a>Members</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/properties" passHref>
              <a>
                <FcHome className={`${styles.icons} ${styles.planIcon}`} />
              </a>
            </Link>
            <Link href="/admin/properties">
              <a>Properties</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/plans" passHref>
              <a>
                <FcTreeStructure
                  className={`${styles.icons} ${styles.planIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin/plans">
              <a>Plans</a>
            </Link>
          </li>
          <li>
            <Link href="/customer/customers" passHref>
              <a>
                <FaUsers className={`${styles.icons} ${styles.usersIcon}`} />
              </a>
            </Link>
            <Link href="/admin/users">
              <a>Users</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/admin/analytics" passHref>
              <a>
                <BsGraphUp
                  className={`${styles.icons} ${styles.analyticsIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin/analytics">
              <a>Analytics</a>
            </Link>
          </li> */}

          <li>
            <Link href="/admin/quotations" passHref>
              <a>
                <MdOutlineRequestQuote
                  className={`${styles.icons} ${styles.managementIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin/quotations">
              <a>Quotations</a>
            </Link>
          </li>

          {/* <li>
            <Link href="/admin" passHref>
              <a>
                <IoMdNotificationsOutline
                  className={`${styles.icons} ${styles.notificationIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin">
              <a>Notification</a>
            </Link>
          </li> */}
          <li>
            <Link href="/admin/settings" passHref>
              <a>
                <CiSettings
                  className={`${styles.icons} ${styles.settingIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin/settings">
              <a>Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/admin" passHref>
              <a>
                {" "}
                <FaRegUser
                  className={`${styles.icons} ${styles.settingIcon}`}
                />
              </a>
            </Link>
            <Link href="/admin">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.spacer}></div>

      <div className={styles.logout} onClick={logoutHandler}>
        <CiLogout className={`${styles.icons} ${styles.logoutIcon}`} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
