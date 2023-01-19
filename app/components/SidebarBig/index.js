import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styles from './sidebarBig-jss';
import MainMenuBig from './MainMenuBig';

function SidebarBig(props) {
  const {
    
    dataMenu,
    loadTransition,
    open,
    toggleDrawerOpen,
  } = props;
  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          onClose={toggleDrawerOpen}
          onOpen={toggleDrawerOpen}
          open={!open}
          anchor="left"
        >
          <div className={classes.swipeDrawerPaper}>
            <MainMenuBig
              dataMenu={dataMenu}
              loadTransition={loadTransition}
              drawerPaper
              toggleDrawerOpen={toggleDrawerOpen}
              mobile
            />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <div>
          <MainMenuBig
            dataMenu={dataMenu}
            loadTransition={loadTransition}
            drawerPaper={open}
          />
        </div>
      </Hidden>
    </Fragment>
  );
}

SidebarBig.propTypes = {
  
  dataMenu: PropTypes.array.isRequired,
  loadTransition: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SidebarBig;
