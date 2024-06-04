import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useStyles from './appStyles-jss';

function Outer() {
  const { classes, cx } = useStyles();
  const gradient = useSelector((state) => state.ui.gradient);
  const decoration = useSelector((state) => state.ui.decoration);

  return (
    <div className={cx(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
      <main className={classes.outerContent} id="mainContent">
        { decoration && <div className={classes.petal} /> }
        <Outlet />
      </main>
    </div>
  );
}

export default Outer;
