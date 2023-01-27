import React from 'react';
import { makeStyles } from 'tss-react/mui';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles()(() => ({
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 45px)',
    left: 'calc(50% - 45px)',
  },
}));

function Loading() {
  const { classes } = useStyles();
  return (<CircularProgress className={classes.circularProgress} size={90} thickness={1} color="secondary" />);
}

export default Loading;
