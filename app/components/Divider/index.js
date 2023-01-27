import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './divider-jss';

/* Gradient Divider */
export const GradientDivider = props => {
  const { classes } = useStyles();
  const {
    thin,

    ...rest
  } = props;
  return (
    <hr className={classes.gradient} style={{ height: `${thin}` }} {...rest} />
  );
};

GradientDivider.propTypes = {
  thin: PropTypes.number,

};

GradientDivider.defaultProps = {
  thin: 1
};

/* Dash Divider */

export const DashDivider = props => {
  const { classes } = useStyles();
  const {
    thin,

    ...rest
  } = props;
  return (
    <hr className={classes.colorDash} style={{ height: `${thin}` }} {...rest} />
  );
};

DashDivider.propTypes = {

  thin: PropTypes.number,
};

DashDivider.defaultProps = {
  thin: 1
};

/* Shadow Divider */

export const ShadowDivider = props => {
  const { classes } = useStyles();
  const {
    thin,
    ...rest
  } = props;
  return (
    <hr className={classes.shadow} style={{ height: `${thin}` }} {...rest} />
  );
};

ShadowDivider.propTypes = {
  thin: PropTypes.number,
};

ShadowDivider.defaultProps = {
  thin: 1
};

/* Shadow Inset */

export const InsetDivider = props => {
  const { classes } = useStyles();
  const {
    thin,
    ...rest
  } = props;
  return (
    <hr className={classes.inset} style={{ height: `${thin}` }} {...rest} />
  );
};

InsetDivider.propTypes = {

  thin: PropTypes.number,
};

InsetDivider.defaultProps = {
  thin: 1
};

/* Shadow FlairedEdges */

export const FlairedEdgesDivider = props => {
  const { classes } = useStyles();
  const {
    thin,
    ...rest
  } = props;
  return (
    <hr className={classes.flairedEdges} style={{ height: `${thin}` }} {...rest} />
  );
};

FlairedEdgesDivider.propTypes = {

  thin: PropTypes.number,
};

FlairedEdgesDivider.defaultProps = {
  thin: 1
};

export const ContentDivider = props => {
  const { classes } = useStyles();
  const {
    thin,
    content,
    ...rest
  } = props;
  return (
    <hr className={classes.content} style={{ height: `${thin}` }} data-content={content} {...rest} />
  );
};

ContentDivider.propTypes = {

  thin: PropTypes.number,
  content: PropTypes.string.isRequired,
};

ContentDivider.defaultProps = {
  thin: 1
};
