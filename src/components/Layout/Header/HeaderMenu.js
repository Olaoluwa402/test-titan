import React from "react";
import Link from "next/link";
import Image from "next/image";
import DrawerToggleButton from "../../SideDrawer/DrawerToggleButton";
import logo from "../../../asset/images/titanium-logo.png";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import styles from "./HeaderMenu.module.css";
import Modal from "../../Modals/CustomModal/CustomModal";
import CreateQuote from "../../Home/Quote/CreateQuote";
const HeaderMenu = ({ drawerToggleClickHandler, SideDrawerOpen }) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.homeData);
  const { menuItems, settings } = store.data;
  const { open } = useSelector((store) => store.openQuote);

  //open the get quote form modal
  const openQuoteHandler = () => {
    dispatch({
      type: "OPEN",
    });
  };

  return (
    <>
      {open && (
        <Modal>
          <CreateQuote />
        </Modal>
      )}

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

          <div onClick={openQuoteHandler} className={styles.navBarMenu__cta}>
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
    </>
  );
};

export default HeaderMenu;
