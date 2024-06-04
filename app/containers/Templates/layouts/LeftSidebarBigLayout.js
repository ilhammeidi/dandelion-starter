import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {
  Header,
  SidebarBig,
  BreadCrumb,
} from 'dan-components';
import dataMenu from 'dan-api/ui/menu';
import Decoration from '../Decoration';
import useStyles from '../appStyles-jss';

function LeftSidebarBigLayout(props) {
  const { classes, cx } = useStyles();
  const {
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    gradient,
    deco,
    history,
    bgPosition,
    changeMode,
    place,
    titleException,
    handleOpenGuide,
  } = props;

  return (
    <Fragment>
      <Header
        toggleDrawerOpen={toggleDrawer}
        margin={sidebarOpen}
        gradient={gradient}
        position="left-sidebar-big"
        changeMode={changeMode}
        mode={mode}
        title={place}
        history={history}
        openGuide={handleOpenGuide}
      />
      <SidebarBig
        dataMenu={dataMenu}
        loadTransition={loadTransition}
        open={sidebarOpen}
        toggleDrawerOpen={toggleDrawer}
      />
      <main className={cx(classes.content, !sidebarOpen ? classes.contentPaddingLeftBig : '')} id="mainContent">
        <Decoration
          mode={mode}
          gradient={gradient}
          decoration={deco}
          bgPosition={bgPosition}
          horizontalMenu={false}
        />
        <section className={cx(classes.mainWrap, classes.sidebarLayout)}>
          {titleException.indexOf(history.location.pathname) < 0 && (
            <div className={classes.pageTitle}>
              <Typography component="h4" className={bgPosition === 'header' ? classes.darkTitle : classes.lightTitle} variant="h4">{place}</Typography>
              <BreadCrumb separator=" / " theme={bgPosition === 'header' ? 'dark' : 'light'} location={history.location} />
            </div>
          )}
          {!pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
          <Fade
            in={pageLoaded}
            {...(pageLoaded ? { timeout: 700 } : {})}
          >
            <div className={!pageLoaded ? classes.hideApp : ''}>
              {/* Application content will load here */}
              { children }
            </div>
          </Fade>
        </section>
      </main>
    </Fragment>
  );
}

LeftSidebarBigLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
};

LeftSidebarBigLayout.defaultProps = {
  pageLoaded: false,
};

export default LeftSidebarBigLayout;
