import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loading from '@material-ui/core/LinearProgress';
import { bindActionCreators } from 'redux';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { changeModeAction } from 'dan-redux/actions/uiActions';
import applicationTheme from '../../styles/theme/applicationTheme';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1,
  },
  loading: {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    opacity: 1,
    transition: 'opacity .5s ease'
  },
  loadingWrap: {
    background: 'none'
  },
  bar: {
    background: 'rgba(255, 255, 255, 0.7)'
  },
  hide: {
    opacity: 0
  }
};

export const AppContext = React.createContext();

class ThemeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: 0,
      theme: createMuiTheme(applicationTheme(props.color, props.mode)),
    };
  }

  componentWillMount = () => {
    this.onProgressShow();
  }

  componentDidMount = () => {
    this.playProgress();
  }

  componentWillUnmount() {
    this.onProgressShow();
  }

  handleChangeMode = mode => {
    const { color, changeMode } = this.props;
    this.setState({ theme: createMuiTheme(applicationTheme(color, mode)) });
    changeMode(mode);
  };

  onProgressShow = () => {
    this.setState({ pageLoaded: 0 });
  }

  onProgressHide = val => {
    this.setState({ pageLoaded: val });
  }

  playProgress = () => {
    let timer = null;
    this.onProgressShow();
    const setCompleted = () => {
      const diff = Math.random() * 40;
      const { pageLoaded } = this.state;
      this.onProgressHide(pageLoaded + diff);
      if (pageLoaded >= 100) {
        clearInterval(timer);
      }
    };
    timer = setInterval(setCompleted, 500);
  }

  render() {
    const { classes, children } = this.props;
    const { pageLoaded, theme } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Loading
            variant="determinate"
            value={pageLoaded}
            className={pageLoaded >= 100 ? classes.hide : ''}
            classes={{
              root: classes.loading,
              colorPrimary: classes.loadingWrap,
              barColorPrimary: classes.bar
            }}
          />
          <AppContext.Provider value={this.handleChangeMode}>
            {children}
          </AppContext.Provider>
        </div>
      </MuiThemeProvider>
    );
  }
}

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  color: state.getIn([reducer, 'theme']),
  mode: state.getIn([reducer, 'type']),
});

const dispatchToProps = dispatch => ({
  changeMode: bindActionCreators(changeModeAction, dispatch),
});

const ThemeWrapperMapped = connect(
  mapStateToProps,
  dispatchToProps
)(ThemeWrapper);

export default withStyles(styles)(ThemeWrapperMapped);
