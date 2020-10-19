import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import styles from './header-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
function MainMenu(props) {
  const [active, setActive] = useState([]);
  const [openMenu, setOpenMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const { open } = props;
    setTimeout(() => {
      setActive(open);
    }, 50);
  }, []);

  const handleOpenMenu = (event, key, keyParent) => {
    const { openSubMenu } = props;
    openSubMenu(key, keyParent);
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setOpenMenu([key]);
    }, 50);
  };

  const handleClose = event => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setOpenMenu([]);
  };

  const handleActiveParent = key => {
    setActive([key]);
    setOpenMenu([]);
  };

  const { classes, open, dataMenu } = props;
  const getMenus = (parent, menuArray) => menuArray.map((item, index) => {
    if (item.multilevel) {
      return false;
    }
    if (item.child || item.linkParent) {
      return (
        <div key={index.toString()}>
          <Button
            aria-owns={open ? 'menu-list-grow' : undefined}
            component={LinkBtn}
            to={item.linkParent ? item.linkParent : '#'}
            className={
              classNames(
                classes.headMenu,
                open.indexOf(item.key) > -1 ? classes.opened : '',
                active.indexOf(item.key) > -1 ? classes.selected : ''
              )
            }
            onClick={(event) => handleOpenMenu(event, item.key, item.keyParent)}
          >
            {item.name}
            { !item.linkParent ? <ExpandMore className={classes.rightIcon} /> : <span className={classes.rightIcon}>&nbsp;&nbsp;</span> }
          </Button>
          { !item.linkParent && (
            <Popper
              open={openMenu.indexOf(item.key) > -1}
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper className={classes.dropDownMenu}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <List role="menu" component="nav" className={classes.paperMenu}>
                        { getMenus(item.key, item.child) }
                      </List>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          )}
        </div>
      );
    }
    if (item.title) {
      return (
        <ListSubheader component="div" key={index.toString()} className={classes.title}>{item.name}</ListSubheader>
      );
    }
    return (
      <ListItem
        key={index.toString()}
        button
        exact
        className={classes.menuItem}
        activeClassName={classes.active}
        component={LinkBtn}
        to={item.link}
        onClick={() => handleActiveParent(parent)}
      >
        <ListItemText primary={item.name} />
      </ListItem>
    );
  });
  return (
    <nav className={classes.mainMenu}>
      <div>
        {getMenus(null, dataMenu)}
      </div>
    </nav>
  );
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = state => ({
  ...state,
  open: state.getIn([reducer, 'subMenuOpen'])
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withStyles(styles)(MainMenuMapped);
