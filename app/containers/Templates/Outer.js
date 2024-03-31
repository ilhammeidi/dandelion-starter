import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import useStyles from './appStyles-jss';

function Outer(props) {
  const { classes, cx } = useStyles();
  const { children } = props;
  const gradient = useSelector((state) => state.ui.gradient);
  const decoration =  useSelector((state) => state.ui.decoration);

  return (
    <div className={cx(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
      <main className={classes.outerContent} id="mainContent">
        { decoration && <div className={classes.petal} /> }
        {children}
      </main>
    </div>
  );
}

Outer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Outer;
