import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import { HeaderMenu, BreadCrumb } from 'dan-components';
import dataMenu from 'dan-api/ui/menu';
import Decoration from '../Decoration';
import useStyles from '../appStyles-jss';

function DropMenuLayout(props) {
  const { classes, cx } = useStyles();
  const {
    children,
    pageLoaded,
    mode,
    gradient,
    deco,
    bgPosition,
    changeMode,
    place,
    history,
    titleException,
    handleOpenGuide,
    toggleDrawer,
    sidebarOpen,
    loadTransition
  } = props;
  return (
    <Fragment>
      <HeaderMenu
        type="top-navigation"
        dataMenu={dataMenu}
        changeMode={changeMode}
        mode={mode}
        history={history}
        openGuide={handleOpenGuide}
        toggleDrawerOpen={toggleDrawer}
        openMobileNav={sidebarOpen}
        loadTransition={loadTransition}
        logoLink="/app"
      />
      <main
        className={
          cx(
            classes.content,
            classes.highMargin
          )
        }
        id="mainContent"
      >
        <Decoration
          mode={mode}
          gradient={gradient}
          decoration={deco}
          bgPosition={bgPosition}
          horizontalMenu
        />
        <section className={cx(classes.mainWrap, classes.topbarLayout)}>
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

DropMenuLayout.propTypes = {

  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired
};

export default DropMenuLayout;
