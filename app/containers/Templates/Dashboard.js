import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { GuideSlider } from 'dan-components';
import { toggleAction, openAction, playTransitionAction } from 'dan-redux/modules/ui';
import LeftSidebarLayout from './layouts/LeftSidebarLayout';
import RightSidebarLayout from './layouts/RightSidebarLayout';
import LeftSidebarBigLayout from './layouts/LeftSidebarBigLayout';
import DropMenuLayout from './layouts/DropMenuLayout';
import MegaMenuLayout from './layouts/MegaMenuLayout';
import useStyles from './appStyles-jss';

function Dashboard(props) {
  const { classes, cx } = useStyles();
  // Initial header style
  const [openGuide, setOpenGuide] = useState(false);
  const [appHeight, setAppHeight] = useState(0);

  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const pageLoaded = useSelector((state) => state.ui.pageLoaded);
  const mode = useSelector((state) => state.ui.type);
  const gradient = useSelector((state) => state.ui.gradient);
  const deco = useSelector((state) => state.ui.decoration);
  const layout = useSelector((state) => state.ui.layout);
  const bgPosition = useSelector((state) => state.ui.bgPosition);

  useEffect(() => {
    const { history } = props;

    // Adjust min height
    setAppHeight(window.innerHeight + 112);

    // Set expanded sidebar menu
    const currentPath = history.location.pathname;
    dispatch(openAction({ initialLocation: currentPath }));
    // Play page transition
    dispatch(playTransitionAction(true));

    // Execute all arguments when page changes
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(playTransitionAction(true));
      }, 500);
    });

    return () => {
      if (unlisten != null) {
        unlisten();
      }
    };
  }, []);

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };
  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  const { changeMode, children, history } = props;
  const titleException = ['/app', '/app/crm-dashboard', '/app/crypto-dashboard'];
  const parts = history.location.pathname.split('/');
  const place = parts[parts.length - 1].replace('-', ' ');
  return (
    <div
      style={{ minHeight: appHeight }}
      className={
        cx(
          classes.appFrameInner,
          layout === 'top-navigation' || layout === 'mega-menu' ? classes.topNav : classes.sideNav,
          mode === 'dark' ? 'dark-mode' : 'light-mode'
        )
      }
    >
      <GuideSlider openGuide={openGuide} closeGuide={handleCloseGuide} />
      { /* Left Sidebar Layout */
        layout === 'left-sidebar' && (
          <LeftSidebarLayout
            history={history}
            toggleDrawer={() => dispatch(toggleAction())}
            loadTransition={() => dispatch(playTransitionAction())}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            gradient={gradient}
            deco={deco}
            bgPosition={bgPosition}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
          >
            { children }
          </LeftSidebarLayout>
        )
      }
      { /* Left Big-Sidebar Layout */
        layout === 'big-sidebar' && (
          <LeftSidebarBigLayout
            history={history}
            toggleDrawer={dispatch(toggleAction)}
            loadTransition={dispatch(playTransitionAction)}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            gradient={gradient}
            deco={deco}
            bgPosition={bgPosition}
            mode={mode}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
          >
            { children }
          </LeftSidebarBigLayout>
        )
      }
      { /* Right Sidebar Layout */
        layout === 'right-sidebar' && (
          <RightSidebarLayout
            history={history}
            toggleDrawer={dispatch(toggleAction)}
            loadTransition={dispatch(playTransitionAction)}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            gradient={gradient}
            deco={deco}
            bgPosition={bgPosition}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
          >
            { children }
          </RightSidebarLayout>
        )
      }
      { /* Top Bar with Dropdown Menu */
        layout === 'top-navigation' && (
          <DropMenuLayout
            history={history}
            toggleDrawer={dispatch(toggleAction)}
            loadTransition={dispatch(playTransitionAction)}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            gradient={gradient}
            deco={deco}
            bgPosition={bgPosition}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
          >
            { children }
          </DropMenuLayout>
        )
      }
      { /* Top Bar with Mega Menu */
        layout === 'mega-menu' && (
          <MegaMenuLayout
            history={history}
            toggleDrawer={dispatch(toggleAction)}
            loadTransition={dispatch(playTransitionAction)}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            gradient={gradient}
            deco={deco}
            bgPosition={bgPosition}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
          >
            { children }
          </MegaMenuLayout>
        )
      }
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
};

export default Dashboard;
