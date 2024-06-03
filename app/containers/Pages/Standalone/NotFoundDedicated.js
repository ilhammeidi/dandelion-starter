import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from 'containers/Templates/appStyles-jss';
import { ErrorWrap } from 'dan-components';

function NotFoundDedicated() {
  const { classes, cx } = useStyles();
  const gradient = useSelector((state) => state.ui.gradient);

  return (
    <div className={cx(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
      <main className={classes.outerContent} id="mainContent">
        <div className={classes.petal} />
        <ErrorWrap title="404" desc="Oops, Page Not Found :(" />
      </main>
    </div>
  );
}

export default NotFoundDedicated;
