import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from './UserMenu';
import SearchUi from '../Search/SearchUi';
import useStyles from './header-jss';

const elem = document.documentElement;

function Header(props) {
  const { classes, cx } = useStyles();
  const [open] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  // Initial header style
  let flagDarker = false;

  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullScreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const turnMode = mode => {
    if (mode === 'light') {
      props.changeMode('dark');
    } else {
      props.changeMode('light');
    }
  };

  const {
    toggleDrawerOpen,
    margin,
    position,
    gradient,
    mode,
    title,
    openGuide,
    history
  } = props;

  const setMargin = (sidebarPosition) => {
    if (sidebarPosition === 'right-sidebar') {
      return classes.right;
    }
    if (sidebarPosition === 'left-sidebar-big') {
      return classes.leftBig;
    }
    return classes.left;
  };

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <AppBar
      className={
        cx(
          classes.appBar,
          classes.floatingBar,
          margin && classes.appBarShift,
          setMargin(position),
          turnDarker && classes.darker,
          gradient ? classes.gradientBg : classes.solidBg
        )
      }
    >
      <Toolbar disableGutters={!open}>
        <Fab
          size="small"
          className={classes.menuButton}
          aria-label="Menu"
          onClick={toggleDrawerOpen}
        >
          <MenuIcon />
        </Fab>
        {!mdDown && (
          <div className={classes.headerProperties}>
            <div className={cx(classes.headerAction, showTitle && classes.fadeOut)}>
              {fullScreen ? (
                <Tooltip title="Exit Full Screen" placement="bottom">
                  <IconButton className={classes.button} onClick={closeFullScreen} size="large">
                    <i className="ion-ios-qr-scanner-outline" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Full Screen" placement="bottom">
                  <IconButton className={classes.button} onClick={openFullScreen} size="large">
                    <i className="ion-ios-qr-scanner-outline" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Turn Dark/Light" placement="bottom">
                <IconButton className={classes.button} onClick={() => turnMode(mode)} size="large">
                  <i className="ion-ios-bulb-outline" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Show Guide" placement="bottom">
                <IconButton className={classes.button} onClick={openGuide} size="large">
                  <i className="ion-ios-help-circle-outline" />
                </IconButton>
              </Tooltip>
            </div>
            <Typography component="h2" className={cx(classes.headerTitle, showTitle && classes.show)}>
              {title}
            </Typography>
          </div>
        )}
        <div className={classes.searchWrapper}>
          <div className={cx(classes.wrapper, classes.light)}>
            <div className={classes.search}>
              <SearchIcon />
            </div>
            <SearchUi history={history} />
          </div>
        </div>
        {!smDown && (
          <span className={classes.separatorV} />
        )}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {

  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Header;
