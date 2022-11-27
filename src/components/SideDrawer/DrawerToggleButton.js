import React from "react";

const DrawerToggleButton = ({ click, SideDrawerOpen }) => {
  let classOpen = "close";
  if (SideDrawerOpen) {
    classOpen = "open";
  }

  return (
    <div className={`${classOpen} menuToggler`} onClick={click}>
      <div className="bar half start"></div>
      <div className="bar"></div>
      <div className="bar half start"></div>
    </div>
  );
};

export default DrawerToggleButton;
