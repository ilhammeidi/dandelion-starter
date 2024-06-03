import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import useStyles from './header-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} />; // eslint-disable-line
});

// eslint-disable-next-line
function MegaMenu(props) {
  const open = useSelector((state) => state.ui.subMenuOpen);
  const location = useLocation();

  const { classes, cx } = useStyles();
  const [active, setActive] = useState([]);
  const [openMenu, setOpenMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [initActive, setInitActive] = useState(true);

  const handleOpenMenu = (event, key) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setOpenMenu([key]);
    }, 50);
  };

  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setOpenMenu([]);
  };

  const handleActiveParent = key => {
    setTimeout(() => {
      setInitActive(false);
      setActive([key]);
    }, 500);
    setOpenMenu([]);
  };

  const { dataMenu } = props;
  const getMenus = (parent, menuArray) => menuArray.map((item, index) => {
    if (item.multilevel) {
      return false;
    }
    if (item.child || item.linkParent) {
      return (
        <div key={index.toString()}>
          <Button
            aria-haspopup="true"
            component={LinkBtn}
            to={item.linkParent ? item.linkParent : '#'}
            className={
              cx(
                classes.headMenu,
                openMenu.indexOf(item.key) > -1 ? classes.opened : '',
                active.indexOf(item.key) > -1 ? classes.selected : '',
                initActive && open.indexOf(item.key) > -1 ? classes.selected : ''
              )
            }
            onClick={(event) => handleOpenMenu(event, item.key)}
          >
            {item.name}
            {!item.linkParent ? <ExpandMore className={classes.rightIcon} /> : <span className={classes.rightIcon}>&nbsp;&nbsp;</span>}
          </Button>
          {!item.linkParent && (
            <Popper
              open={openMenu.indexOf(item.key) > -1}
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Fade
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper className={classes.dropDownMenu}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <Grid container>
                        <Grid item md={3} container justifyContent="center">
                          <span className={classes.bigIcon}>
                            <i className={cx(classes.icon, item.icon)} />
                          </span>
                        </Grid>
                        <Grid item md={9}>
                          <List role="menu" component="nav" className={classes.megaMenu}>
                            { getMenus(item.key, item.child) }
                          </List>
                        </Grid>
                      </Grid>
                    </ClickAwayListener>
                  </Paper>
                </Fade>
              )}
            </Popper>
          )}
        </div>
      );
    }
    if (item.title) {
      return (
        <ListSubheader
          component="div"
          key={index.toString()}
          className={classes.title}
        >
          {item.name}
        </ListSubheader>
      );
    }
    return (
      <ListItem
        key={index.toString()}
        button
        className={cx(classes.megaItem, (item.link === '/app' && location.pathname !== '/app') ? 'rootPath' : '')}
        component={LinkBtn}
        to={item.link || item.linkParent}
        onClick={() => handleActiveParent(parent)}
      >
        <ListItemText primary={item.name} />
      </ListItem>
    );
  });
  return (
    <nav className={classes.mainMenu}>
      <div className={classes.megaMenu}>
        {getMenus(null, dataMenu)}
      </div>
    </nav>
  );
}

MegaMenu.propTypes = {
  dataMenu: PropTypes.array.isRequired,
};

export default MegaMenu;
