import React from "react";
import Link from "next/link";
import Image from "next/image";
import DrawerToggleButton from "../../SideDrawer/DrawerToggleButton";
import logo from "../../../asset/images/titanium-logo.png";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import styles from "./HeaderMenu.module.css";

const HeaderMenu = ({ drawerToggleClickHandler, SideDrawerOpen }) => {
  const store = useSelector((store) => store.homeData);
  const { menuItems, settings } = store.data;

  return (
    <div className={`${styles.container}`}>
      <nav className={`${styles.navBarMenu} wrapper-80`}>
        <Link href="/" className={styles.navBarMenu__logo}>
          <a>
            <Image src={logo} alt="titanium" width={74} height={62} />
          </a>
        </Link>

        {/* nav items */}
        <NavBar menuItems={menuItems ? menuItems.slice(0, 6) : []} />

        <div className={styles.spacer}></div>
        <div className={styles.navBarMenu__cta}>
          <span>
            {settings && settings.length > 0 && settings[0].getQuoteCTA
              ? settings[0].getQuoteCTA
              : ""}
          </span>
        </div>
        <DrawerToggleButton
          click={drawerToggleClickHandler}
          SideDrawerOpen={SideDrawerOpen}
        />
      </nav>
    </div>
  );
};

export default HeaderMenu;
