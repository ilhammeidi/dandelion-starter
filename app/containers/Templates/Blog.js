import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { toggleAction, playTransitionAction } from 'dan-actions/UiActions';
import { HeaderMenu, Footer, GuideSlider } from 'dan-components';
import dataMenu from 'dan-api/ui/menuBlog';
import Decoration from './Decoration';
import styles from './appStyles-jss';

class Blog extends React.Component {
  state = {
    transform: 0,
    openGuide: false
  };

  componentDidMount = () => {
    const { history } = this.props;
    // Scroll content to top
    window.addEventListener('scroll', this.handleScroll);
    // Execute all arguments when page changes
    this.unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    this.setState({
      transform: scroll
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
      mode,
      gradient,
      deco,
      layout,
      history,
      changeMode,
      toggleDrawer,
      sidebarOpen,
      loadTransition
    } = this.props;
    const { openGuide, transform } = this.state;
    return (
      <div className={classes.appFrameLanding} id="mainContent">
        <GuideSlider openGuide={openGuide} closeGuide={this.handleCloseGuide} />
        <Decoration
          mode={mode}
          gradient={gradient}
          decoration={deco}
          bgPosition="header"
          horizontalMenu={layout === 'top-navigation' || layout === 'mega-menu'}
        />
        <HeaderMenu
          type="top-navigation"
          dataMenu={dataMenu}
          fixed={transform > 64}
          changeMode={changeMode}
          mode={mode}
          history={history}
          openGuide={this.handleOpenGuide}
          toggleDrawerOpen={toggleDrawer}
          openMobileNav={sidebarOpen}
          loadTransition={loadTransition}
          isLogin={false}
          logoLink="/blog"
        />
        <div className={classes.blogWrap}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  layout: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  loadTransition: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  sidebarOpen: state.getIn([reducer, 'sidebarOpen']),
  pageLoaded: state.getIn([reducer, 'pageLoaded']),
  mode: state.getIn([reducer, 'type']),
  gradient: state.getIn([reducer, 'gradient']),
  deco: state.getIn([reducer, 'decoration']),
  layout: state.getIn([reducer, 'layout']),
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleAction),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
});

const BlogMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

export default (withStyles(styles)(BlogMapped));
