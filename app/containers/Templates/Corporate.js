import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HeaderLanding, Footer } from 'dan-components';
import styles from './appStyles-jss';

class Corporate extends React.Component {
  state = {
    transform: 0,
  };

  componentDidMount = () => {
    // Scroll content to top
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // const mainContent = document.getElementById('app');
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scroll = window.pageYOffset;
    this.setState({
      transform: scroll
    });
  }

  render() {
    const { classes, children } = this.props;
    const { transform } = this.state;
    return (
      <div className={classes.appFrameLanding} id="mainContent">
        <HeaderLanding turnDarker={transform > 30} />
        {children}
        <Footer />
      </div>
    );
  }
}

Corporate.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default (withStyles(styles)(Corporate));
