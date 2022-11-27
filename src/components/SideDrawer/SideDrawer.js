import React from "react";
import { MdContactPhone } from "react-icons/md";
import {
  RiServiceFill,
} from "react-icons/ri";
import {GiPayMoney,GiFamilyHouse} from 'react-icons/gi'
import {BsInfoSquareFill} from "react-icons/bs"; 
import logo from "../../asset/images/titanium-logo.png";
import Image from "next/image";
import Link from "next/link";

const SideDrawer = ({show, setSideDrawerOpen}) => {
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
          <li className="dropdown">
            <div className="dropdownContainer">
              <BsInfoSquareFill className="dropdownIcon" />
              <Link href="/">
                <a className="dropdown_Link" onClick={()=> setSideDrawerOpen((prev)=> !prev)}>About us</a> 
              </Link>
            </div>
          </li>
          <li className="dropdown">
            <div className="dropdownContainer">
              <RiServiceFill className="dropdownIcon" />
              <Link href="/">
                <a className="dropdown_Link" onClick={()=> setSideDrawerOpen((prev)=> !prev)}>Services</a>
              </Link>
            </div> 
          </li>
          <li className="dropdown">
            <div className="dropdownContainer">
              <GiPayMoney className="dropdownIcon" />
              <Link href="/">
                <a className="dropdown_Link" onClick={()=> setSideDrawerOpen((prev)=> !prev)}>Investment Club</a>
              </Link>
            </div> 
          </li>

          <li className="dropdown">
            <div className="dropdownContainer">
              <GiFamilyHouse className="dropdownIcon" />
              <Link href="/">
                <a className="dropdown_Link" onClick={()=> setSideDrawerOpen((prev)=> !prev)}>Properties</a>
              </Link>
            </div>
          </li>

          <li className="dropdown">
            <div className="dropdownContainer">
              <MdContactPhone className="dropdownIcon" />
              <Link href="/">
                <a className="dropdown_Link" onClick={()=> setSideDrawerOpen((prev)=> !prev)}>Contact Us</a>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default SideDrawer;
