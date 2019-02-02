import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './divider-jss';

/* Gradient Divider */
const Gradient = props => {
  const {
    thin,
    classes,
    ...rest
  } = props;
  return (
    <hr className={classes.gradient} style={{ height: `${thin}` }} {...rest} />
  );
};

Gradient.propTypes = {
  thin: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

Gradient.defaultProps = {
  thin: 1
};

export const GradientDivider = withStyles(styles)(Gradient);

/* Dash Divider */

const Dash = props => {
  const {
    thin,
    classes,
    ...rest
  } = props;
  return (
    <hr className={classes.colorDash} style={{ height: `${thin}` }} {...rest} />
  );
};

Dash.propTypes = {
  classes: PropTypes.object.isRequired,
  thin: PropTypes.number,
};

Dash.defaultProps = {
  thin: 1
};

export const DashDivider = withStyles(styles)(Dash);

/* Shadow Divider */

const Shadow = props => {
  const {
    classes,
    thin,
    ...rest
  } = props;
  return (
    <hr className={classes.shadow} style={{ height: `${thin}` }} {...rest} />
  );
};

Shadow.propTypes = {
  classes: PropTypes.object.isRequired,
  thin: PropTypes.number,
};

Shadow.defaultProps = {
  thin: 1
};

export const ShadowDivider = withStyles(styles)(Shadow);

/* Shadow Inset */

const Inset = props => {
  const {
    classes,
    thin,
    ...rest
  } = props;
  return (
    <hr className={classes.inset} style={{ height: `${thin}` }} {...rest} />
  );
};

Inset.propTypes = {
  classes: PropTypes.object.isRequired,
  thin: PropTypes.number,
};

Inset.defaultProps = {
  thin: 1
};

export const InsetDivider = withStyles(styles)(Inset);

/* Shadow FlairedEdges */

export const FlairedEdges = props => {
  const {
    classes,
    thin,
    ...rest
  } = props;
  return (
    <hr className={classes.flairedEdges} style={{ height: `${thin}` }} {...rest} />
  );
};

FlairedEdges.propTypes = {
  classes: PropTypes.object.isRequired,
  thin: PropTypes.number,
};

FlairedEdges.defaultProps = {
  thin: 1
};

export const FlairedEdgesDivider = withStyles(styles)(FlairedEdges);


export const Content = props => {
  const {
    classes,
    thin,
    content,
    ...rest
  } = props;
  return (
    <hr className={classes.content} style={{ height: `${thin}` }} data-content={content} {...rest} />
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  thin: PropTypes.number,
  content: PropTypes.string.isRequired,
};

Content.defaultProps = {
  thin: 1
};

export const ContentDivider = withStyles(styles)(Content);
