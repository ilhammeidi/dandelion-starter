import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import useStyles from 'containers/Templates/appStyles-jss';
import { ErrorWrap } from 'dan-components';

function NotFoundDedicated(props) {
  const { classes, cx } = useStyles();
  const { gradient } = props;
  return (
    <div className={cx(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
      <main className={classes.outerContent} id="mainContent">
        <div className={classes.petal} />
        <ErrorWrap title="404" desc="Oops, Page Not Found :(" />
      </main>
    </div>
  );
}

NotFoundDedicated.propTypes = {

  gradient: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  gradient: state.ui.gradient
});

const NotFoundDedicatedMaped = connect(
  mapStateToProps,
)(NotFoundDedicated);

export default NotFoundDedicatedMaped;
