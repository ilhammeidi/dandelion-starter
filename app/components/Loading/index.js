import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 45px)',
    left: 'calc(50% - 45px)',
  }
};

function Loading(props) {
  
  return (<CircularProgress className={classes.circularProgress} size={90} thickness={1} color="secondary" />);
}

Loading.propTypes = {
  
};
export default Loading;
