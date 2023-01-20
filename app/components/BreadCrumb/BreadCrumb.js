import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link, Route } from 'react-router-dom';
import useStyles from './breadCrumb-jss';

const Breadcrumbs = (props) => {
  const { classes, cx } = useStyles();
  const {
    theme,
    separator,
    location
  } = props;
  return (
    <section className={cx(theme === 'dark' ? classes.dark : classes.light, classes.breadcrumbs)}>
      <Route
        path="*"
        render={() => {
          let parts = location.pathname.split('/');
          const place = parts[parts.length - 1];
          parts = parts.slice(1, parts.length - 1);
          return (
            <p>
              You are here:
              <span>
                {
                  parts.map((part, partIndex) => {
                    const path = ['', ...parts.slice(0, partIndex + 1)].join('/');
                    return (
                      <Fragment key={path}>
                        <Link to={path}>{part}</Link>
                        { separator }
                      </Fragment>
                    );
                  })
                }
                &nbsp;
                {place}
              </span>
            </p>
          );
        }}
      />
    </section>
  );
};

Breadcrumbs.propTypes = {

  location: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  separator: PropTypes.string.isRequired,
};

export default Breadcrumbs;
