import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonBase from '@mui/material/ButtonBase';
import { openAction, openMenuAction, closeMenuAction } from 'dan-redux/modules/ui';
import MenuProfile from './MenuProfile';
import useStyles from './sidebarBig-jss';

function MainMenuBig(props) {
  const { classes, cx } = useStyles();
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [menuLoaded, setMenuLoaded] = useState(true);
  const location = useLocation();

  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.subMenuOpen);

  const { dataMenu, drawerPaper } = props;

  const handleLoadMenu = (menu, key) => {
    const { mobile } = props;
    setSelectedMenu(menu);
    setMenuLoaded(false); // unload transition menu
    dispatch(openAction({ key }));

    setTimeout(() => {
      setMenuLoaded(true); // load transtion menu
    }, 100);
    // Unecessary in mobile, because toggle menu is handled already
    if (!mobile) {
      dispatch(openMenuAction());
    }
  };

  const handleLoadSingleMenu = () => {
    setSelectedMenu([]);
    dispatch(closeMenuAction());
  };

  const handleLoadPage = () => {
    const { loadTransition, toggleDrawerOpen } = props;
    toggleDrawerOpen();
    loadTransition(false);
  };

  const currentMenu = dataMenu.filter(item => item.key === open[0]);
  const activeMenu = (key, child) => {
    if (selectedMenu.length < 1) {
      if (open.indexOf(key) > -1) {
        return true;
      }
      return false;
    }
    if (child === selectedMenu) {
      return true;
    }
    return false;
  };

  const getMenus = menuArray => menuArray.map((item, index) => {
    if (item.key === 'menu_levels') {
      return false;
    }
    if (item.child) {
      return (
        <ButtonBase
          key={index.toString()}
          focusRipple
          className={
            cx(
              classes.menuHead,
              activeMenu(item.key, item.child) ? 'active' : ''
            )
          }
          onClick={() => handleLoadMenu(item.child, item.key)}
        >
          <i className={cx(classes.icon, item.icon)} />
          <span className={classes.text}>
            { item.name }
          </span>
        </ButtonBase>
      );
    }
    return (
      <ButtonBase
        key={index.toString()}
        focusRipple
        component={NavLink}
        className={cx(classes.menuHead, (item.link === '/app' && location.pathname !== '/app') ? 'rootPath' : '')}
        to={item.linkParent}
        onClick={() => handleLoadSingleMenu(item.key)}
      >
        <i className={cx(classes.icon, item.icon)} />
        <span className={classes.text}>
          { item.name }
        </span>
      </ButtonBase>
    );
  });

  const getChildMenu = menuArray => menuArray.map((item, index) => {
    if (item.title) {
      return (
        <ListSubheader
          key={index.toString()}
          disableSticky
          className={classes.title}
        >
          { item.name }
        </ListSubheader>
      );
    }
    return (
      <ListItem
        key={index.toString()}
        button
        className={cx(classes.item, (item.link === '/app' && location.pathname !== '/app') ? 'rootPath' : '')}
        component={NavLink}
        to={item.link}
        onClick={() => handleLoadPage()}
      >
        <ListItemIcon>
          <i className={cx(classes.icon, item.icon)} />
        </ListItemIcon>
        <ListItemText
          className={classes.text}
          primary={item.name}
        />
      </ListItem>
    );
  });

  const renderChildMenu = () => {
    if (selectedMenu.length < 1) {
      return (
        <List dense className={classes.fixedWrap}>
          {currentMenu.length > 0 ? getChildMenu(currentMenu[0].child) : ''}
        </List>
      );
    }
    return (
      <List
        dense
        className={
          cx(
            classes.fixedWrap,
            classes.childMenuWrap,
            menuLoaded && classes.menuLoaded
          )
        }
      >
        {getChildMenu(selectedMenu)}
      </List>
    );
  };

  return (
    <aside className={classes.bigSidebar}>
      <nav className={classes.category}>
        <div className={cx(classes.fixedWrap, !drawerPaper && classes.userShifted)}>
          <MenuProfile />
          {getMenus(dataMenu)}
        </div>
      </nav>
      <nav className={cx(classes.listMenu, !drawerPaper && classes.drawerPaperClose)}>
        {renderChildMenu()}
      </nav>
    </aside>
  );
}

MainMenuBig.propTypes = {
  dataMenu: PropTypes.array.isRequired,
  loadTransition: PropTypes.func.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
};

MainMenuBig.defaultProps = {
  toggleDrawerOpen: () => {},
  mobile: false
};

export default MainMenuBig;
