import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCalendar2Line } from "react-icons/ri";
import Image from "next/image";
import profile from "../../../../asset/images/profile.png";

import styles from "./NavBar.module.css";
import Link from "next/link";

const NavBar = () => {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.nav_search}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="search" />
        </div>

        <div className={styles.nav_items}>
          <ul>
            <li className={styles.calendar}>
              <RiCalendar2Line className={styles.calendarIcon} />
              <span className={styles.calendar__text}>Today</span>
            </li>
            <li className={styles.date}>
              <span className={styles.date__text}>August, 29</span>
              <BiChevronDown className={styles.chevronIcon} />
            </li>
            <li>
              <div
                className={styles.notification}
                onClick={() => setShowNotification((prev) => !prev)}
              >
                <IoMdNotificationsOutline className={styles.notificationIcon} />
                <div className={styles.count}>
                  <span>2</span>
                </div>
              </div>
            </li>
            <li className={styles.profile}>
              <div className={styles.profileImage}>
                <Image src={profile} alt="profile" />
              </div>
              <BiChevronDown className={styles.chevronIcon} />
            </li>
          </ul>
        </div>
      </div>

      {/* notification list modal */}

      {showNotification && (
        <div className="flex flex-col justify-center items-center fixed top-16 right-4 z-50">
          <div className={styles.triangle}></div>
          <div className="w-[200px] max-h-fit bg-white drop-shadow-md rounded-lg p-3 ">
            <ul>
              <li className="cursor-pointer hover:bg-slate-200">
                message one ....
              </li>
              <li className="cursor-pointer  hover:bg-slate-200">
                message one ....
              </li>
              <li className="cursor-pointer  hover:bg-slate-200">
                message one ...
              </li>
              <li className="cursor-pointer  hover:bg-slate-200">
                message one ...
              </li>
            </ul>

            <Link href="/admin/notifications">
              <button className="max-w-fit bg-peppermartDark80 rounded-xl text-white px-6 py-3 hover:opacity-60 mt-3">
                View All
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
