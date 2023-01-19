import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import styles from './appStyles-jss';

function Outer(props) {
  const {
    
    children,
    gradient,
    decoration
  } = props;
  return (
    <div className={classNames(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
      <main className={classes.outerContent} id="mainContent">
        { decoration && <div className={classes.petal} /> }
        {children}
      </main>
    </div>
  );
}

Outer.propTypes = {
  
  gradient: PropTypes.bool.isRequired,
  decoration: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  gradient: state.ui.gradient,
  decoration: state.ui.decoration,
});

const OuterMaped = connect(
  mapStateToProps,
)(Outer);

export default OuterMaped;
