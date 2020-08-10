import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import Ionicon from 'react-ionicons';
import { openMenuAction, closeMenuAction } from 'dan-redux/actions/uiActions';
import MenuProfile from './MenuProfile';
import styles from './sidebarBig-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function MainMenuBig(props) {
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [menuLoaded, setMenuLoaded] = useState(true);

  const handleLoadMenu = menu => {
    const { openDrawer, mobile } = props;
    setSelectedMenu(menu);
    setMenuLoaded(false); // unload transtion menu
    setTimeout(() => {
      setMenuLoaded(true); // load transtion menu
    }, 100);
    // Unecessary in mobile, because toggle menu is handled already
    if (!mobile) {
      openDrawer();
    }
  };

  const handleLoadPage = () => {
    const { loadTransition, toggleDrawerOpen } = props;
    toggleDrawerOpen();
    loadTransition(false);
  };

  const {
    classes,
    open,
    closeDrawer,
    dataMenu,
    drawerPaper,
  } = props;

  const currentMenu = dataMenu.filter(item => item.key === open.get(0));
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
            classNames(
              classes.menuHead,
              activeMenu(item.key, item.child) ? classes.active : ''
            )
          }
          onClick={() => handleLoadMenu(item.child)}
        >
          <Ionicon className={classes.icon} icon={item.icon} />
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
        className={classNames(classes.menuHead, open.indexOf(item.key) > -1 ? classes.active : '')}
        component={LinkBtn}
        to={item.linkParent}
        onClick={closeDrawer}
      >
        <Ionicon className={classes.icon} icon={item.icon} />
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
        exact
        className={classes.item}
        activeClassName={classes.active}
        component={LinkBtn}
        to={item.link}
        onClick={() => handleLoadPage()}
      >
        <ListItemIcon>
          <Ionicon className={classes.icon} icon={item.icon} />
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
          classNames(
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
        <div className={classNames(classes.fixedWrap, !drawerPaper && classes.userShifted)}>
          <MenuProfile />
          {getMenus(dataMenu)}
        </div>
      </nav>
      <nav className={classNames(classes.listMenu, !drawerPaper && classes.drawerPaperClose)}>
        {renderChildMenu()}
      </nav>
    </aside>
  );
}

MainMenuBig.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  dataMenu: PropTypes.array.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
};

MainMenuBig.defaultProps = {
  toggleDrawerOpen: () => {},
  mobile: false
};

const reducer = 'ui';

const mapStateToProps = state => ({
  open: state.getIn([reducer, 'subMenuOpen']),
  ...state
});

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openMenuAction),
  closeDrawer: () => dispatch(closeMenuAction)
});

const MainMenuBigMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMenuBig);

export default withStyles(styles)(MainMenuBigMapped);
