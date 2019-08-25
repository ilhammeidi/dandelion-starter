import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { GuideSlider } from 'dan-components';
import { toggleAction, openAction, playTransitionAction } from 'dan-actions/UiActions';
import LeftSidebarLayout from './layouts/LeftSidebarLayout';
import RightSidebarLayout from './layouts/RightSidebarLayout';
import LeftSidebarBigLayout from './layouts/LeftSidebarBigLayout';
import DropMenuLayout from './layouts/DropMenuLayout';
import MegaMenuLayout from './layouts/MegaMenuLayout';
import styles from './appStyles-jss';

class Dashboard extends React.Component {
  // Initial header style
  state = {
    openGuide: false
  };

  componentDidMount = () => {
    const { history, initialOpen, loadTransition } = this.props;

    // Set expanded sidebar menu
    const currentPath = history.location.pathname;
    initialOpen(currentPath);
    // Play page transition
    loadTransition(true);

    // Execute all arguments when page changes
    this.unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });
  }

  handleOpenGuide = () => {
    this.setState({ openGuide: true });
  };

  handleCloseGuide = () => {
    this.setState({ openGuide: false });
  };

  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      pageLoaded,
      mode,
      history,
      gradient,
      deco,
      bgPosition,
      layout,
      changeMode
    } = this.props;
    const { openGuide } = this.state;
    const titleException = ['/app', '/app/crm-dashboard', '/app/crypto-dashboard'];
    const parts = history.location.pathname.split('/');
    const place = parts[parts.length - 1].replace('-', ' ');
    return (
      <div
        className={
          classNames(
            classes.appFrameInner,
            layout === 'top-navigation' || layout === 'mega-menu' ? classes.topNav : classes.sideNav,
            mode === 'dark' ? 'dark-mode' : 'light-mode'
          )
        }
      >
        <GuideSlider openGuide={openGuide} closeGuide={this.handleCloseGuide} />
        { /* Left Sidebar Layout */
          layout === 'left-sidebar' && (
            <LeftSidebarLayout
              history={history}
              toggleDrawer={toggleDrawer}
              loadTransition={loadTransition}
              changeMode={changeMode}
              sidebarOpen={sidebarOpen}
              pageLoaded={pageLoaded}
              mode={mode}
              gradient={gradient}
              deco={deco}
              bgPosition={bgPosition}
              place={place}
              titleException={titleException}
              handleOpenGuide={this.handleOpenGuide}
            >
              { children }
            </LeftSidebarLayout>
          )
        }
        { /* Left Big-Sidebar Layout */
          layout === 'big-sidebar' && (
            <LeftSidebarBigLayout
              history={history}
              toggleDrawer={toggleDrawer}
              loadTransition={loadTransition}
              changeMode={changeMode}
              sidebarOpen={sidebarOpen}
              pageLoaded={pageLoaded}
              gradient={gradient}
              deco={deco}
              bgPosition={bgPosition}
              mode={mode}
              place={place}
              titleException={titleException}
              handleOpenGuide={this.handleOpenGuide}
            >
              { children }
            </LeftSidebarBigLayout>
          )
        }
        { /* Right Sidebar Layout */
          layout === 'right-sidebar' && (
            <RightSidebarLayout
              history={history}
              toggleDrawer={toggleDrawer}
              loadTransition={loadTransition}
              changeMode={changeMode}
              sidebarOpen={sidebarOpen}
              pageLoaded={pageLoaded}
              mode={mode}
              gradient={gradient}
              deco={deco}
              bgPosition={bgPosition}
              place={place}
              titleException={titleException}
              handleOpenGuide={this.handleOpenGuide}
            >
              { children }
            </RightSidebarLayout>
          )
        }
        { /* Top Bar with Dropdown Menu */
          layout === 'top-navigation' && (
            <DropMenuLayout
              history={history}
              toggleDrawer={toggleDrawer}
              loadTransition={loadTransition}
              changeMode={changeMode}
              sidebarOpen={sidebarOpen}
              pageLoaded={pageLoaded}
              mode={mode}
              gradient={gradient}
              deco={deco}
              bgPosition={bgPosition}
              place={place}
              titleException={titleException}
              handleOpenGuide={this.handleOpenGuide}
            >
              { children }
            </DropMenuLayout>
          )
        }
        { /* Top Bar with Mega Menu */
          layout === 'mega-menu' && (
            <MegaMenuLayout
              history={history}
              toggleDrawer={toggleDrawer}
              loadTransition={loadTransition}
              changeMode={changeMode}
              sidebarOpen={sidebarOpen}
              pageLoaded={pageLoaded}
              mode={mode}
              gradient={gradient}
              deco={deco}
              bgPosition={bgPosition}
              place={place}
              titleException={titleException}
              handleOpenGuide={this.handleOpenGuide}
            >
              { children }
            </MegaMenuLayout>
          )
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired
};

const reducer = 'ui';
const mapStateToProps = state => ({
  sidebarOpen: state.getIn([reducer, 'sidebarOpen']),
  pageLoaded: state.getIn([reducer, 'pageLoaded']),
  mode: state.getIn([reducer, 'type']),
  gradient: state.getIn([reducer, 'gradient']),
  deco: state.getIn([reducer, 'decoration']),
  layout: state.getIn([reducer, 'layout']),
  bgPosition: state.getIn([reducer, 'bgPosition']),
  ...state,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
});

const DashboardMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default (withStyles(styles)(DashboardMaped));
