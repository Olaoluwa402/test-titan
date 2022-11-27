import React from "react";
import Link from "next/link";
import logo from "../../../../asset/images/titanium-logo.png";
import Image from "next/image";
import { CiLogout, CiHome, CiSettings } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdOutlineShoppingCart, MdOutlineMessage } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import styles from "./SideBar.module.css";
import { FaRegUser } from "react-icons/fa";
import { BiStore } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className={styles.container}>
      {/* logo */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo}>
            <Image src={logo} alt="peppermart" />
          </a>
        </Link>
      </div>

      {/* items */}
      <div className={styles.itemsContainer}>
        <ul>
          <li>
            <Link href="/admin">
              <CiHome className={`${styles.icons} ${styles.homeIcon}`} />
            </Link>
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/orders">
              <MdOutlineShoppingCart
                className={`${styles.icons} ${styles.orderIcon}`}
              />
            </Link>
            <Link href="/admin/orders">
              <a>Orders</a>
            </Link>
          </li>
          <li>
            <Link href="/vendor/vendor/vendors">
              <BiStore
                className={`${styles.icons} ${styles.notificationIcon}`}
              />
            </Link>
            <Link href="/vendor/vendor/vendors">
              <a>Vendors</a>
            </Link>
          </li>
          <li>
            <Link href="/customer/customers">
              <BsCart3
                className={`${styles.icons} ${styles.notificationIcon}`}
              />
            </Link>
            <Link href="/customer/customers">
              <a>Customers</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics">
              <BsGraphUp
                className={`${styles.icons} ${styles.analyticsIcon}`}
              />
            </Link>
            <Link href="/admin/analytics">
              <a>Analytics</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/messages">
              <MdOutlineMessage
                className={`${styles.icons} ${styles.notificationIcon}`}
              />
            </Link>
            <Link href="/admin/messages">
              <a>Messages</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/content_management">
              <FiEdit className={`${styles.icons} ${styles.managementIcon}`} />
            </Link>
            <Link href="/admin/content_management">
              <a>Content Management</a>
            </Link>
          </li>

          <li>
            <Link href="/admin/notifications">
              <IoMdNotificationsOutline
                className={`${styles.icons} ${styles.notificationIcon}`}
              />
            </Link>
            <Link href="/admin/notifications">
              <a>Notification</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/profile">
              <FaRegUser className={`${styles.icons} ${styles.settingIcon}`} />
            </Link>
            <Link href="/admin/profile">
              <a>Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/settings">
              <CiSettings className={`${styles.icons} ${styles.settingIcon}`} />
            </Link>
            <Link href="/admin/settings">
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.spacer}></div>

      <div className={styles.logout}>
        <CiLogout className={`${styles.icons} ${styles.logoutIcon}`} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
