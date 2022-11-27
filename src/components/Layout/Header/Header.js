import React from 'react'
import HeaderMenu from './HeaderMenu'
import HeaderTop from './HeaderTop'

import styles from './Header.module.css'

const Header = ({drawerToggleClickHandler,SideDrawerOpen}) => {
  return (
    <div className= {styles.container}>
       {/* header top */}
      <HeaderTop />
      {/* header menu */}
      <HeaderMenu drawerToggleClickHandler={drawerToggleClickHandler}  SideDrawerOpen={SideDrawerOpen}/>
    </div>
  )
}

export default Header