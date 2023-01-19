import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useStyles from './sidebarBig-jss';
import MainMenuBig from './MainMenuBig';

function SidebarBig(props) {
  const { classes } = useStyles();
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
      <Hidden lgDown>
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
