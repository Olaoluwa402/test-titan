import React from "react";
import { MdContactPhone } from "react-icons/md";
import { RiServiceFill } from "react-icons/ri";
import { GiPayMoney, GiFamilyHouse } from "react-icons/gi";
import { BsInfoSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import logo from "../../asset/images/titanium-logo.png";
import Image from "next/image";
import Link from "next/link";

const SideDrawer = ({ show, setSideDrawerOpen }) => {
  const store = useSelector((store) => store.homeData.data);
  const { menuItems } = store;

  let drawerClasses = "side-drawer";
  if (show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <React.Fragment>
      <nav className={drawerClasses}>
        <div className="drawerClasses-logo__wrapper">
          <h1 className="side-drawer-logo">
            <Image src={logo} alt="Titanium" width={200} height={120} />
          </h1>
        </div>
        <ul className="dropdown-user-icon" id="">
          {menuItems &&
            menuItems.map((item) => (
              <li key={item.id} className="dropdown">
                <div className="dropdownContainer">
                  <BsInfoSquareFill className="dropdownIcon" />
                  <Link href={item.url}>
                    <a
                      className="dropdown_Link"
                      onClick={() => setSideDrawerOpen((prev) => !prev)}
                    >
                      {item.name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default SideDrawer;
