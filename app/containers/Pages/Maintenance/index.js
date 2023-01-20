import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Build from '@mui/icons-material/Build';
import useMediaQuery from '@mui/material/useMediaQuery';
import Settings from '@mui/icons-material/SettingsApplications';
import Warning from '@mui/icons-material/Warning';

const useStyles = makeStyles()((theme) => ({
  container: {
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  title: {
    color: '#FFF'
  },
  subtitle: {
    color: '#FFF'
  },
  paper: {
    margin: 'auto',
    padding: 40,
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: 600,
      height: 300,
    },
    textAlign: 'center'
  },
  artwork: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30
  },
  icon: {
    margin: '10px 20px',
    background: 'rgba(255,255,255,0.6)',
    color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    width: 100,
    height: 100,
    boxShadow: theme.shadows[4],
    '& svg': {
      fontSize: 64,
    },
  },
}));

function Maintenance() {
  const title = brand.name + ' - Maintenance';
  const description = brand.desc;
  const { classes } = useStyles();

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.artwork}>
          <Avatar className={classes.icon}><Build /></Avatar>
          {!smDown && (
            <Avatar className={classes.icon}><Warning /></Avatar>
          )}
          {!smDown && (
            <Avatar className={classes.icon}><Settings /></Avatar>
          )}
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>Under maintenance</Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Our website is under maintenance. We will be back shortly
        </Typography>
      </div>
    </div>
  );
}

export default Maintenance;
