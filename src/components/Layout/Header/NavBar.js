import React from "react";
import MenuItems from "./MenuItems";

import styles from "./HeaderMenu.module.css";

const NavBar = ({ menuItems }) => {
  return (
    <nav>
      <ul className={`${styles.navBarMenu__items}`}>
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
