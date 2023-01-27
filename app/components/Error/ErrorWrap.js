import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Route, Link } from 'react-router-dom';

const useStyles = makeStyles()((theme) => ({
  errorWrap: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: '50%',
    width: 500,
    height: 500,
    [theme.breakpoints.down('md')]: {
      width: 300,
      height: 300,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: `${theme.spacing(3)} auto`,
    '& h5': {
      [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem',
      },
    },
  },
  title: {
    color: theme.palette.primary.main,
    textShadow: `10px 6px 50px ${theme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem',
      marginBottom: theme.spacing(2)
    },
  },
  deco: {
    boxShadow: theme.shadows[2],
    position: 'absolute',
    borderRadius: 2,
  },
  button: {
    marginTop: 24
  }
}));

const ErrorWrap = (props) => {
  const { classes } = useStyles();
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = 404; // eslint-disable-line
        }
        const { title, desc } = props;
        return (
          <div className={classes.errorWrap}>
            <Typography className={classes.title} variant="h1">{title}</Typography>
            <Typography variant="h5">{desc}</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/app/"
            >
              Go To Dashboard
            </Button>
          </div>
        );
      }}
    />
  );
};

ErrorWrap.propTypes = {

  desc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ErrorWrap;
