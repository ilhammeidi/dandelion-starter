import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Build from '@material-ui/icons/Build';
import Hidden from '@material-ui/core/Hidden';
import Settings from '@material-ui/icons/SettingsApplications';
import Warning from '@material-ui/icons/Warning';

const styles = theme => ({
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
    color: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    width: 100,
    height: 100,
    boxShadow: theme.shadows[4],
    '& svg': {
      fontSize: 64,
    },
  },
});

class Maintenance extends React.Component {
  render() {
    const title = brand.name + ' - Maintenance';
    const description = brand.desc;
    const { classes } = this.props;
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
            <Hidden xsDown>
              <Avatar className={classes.icon}><Warning /></Avatar>
            </Hidden>
            <Hidden xsDown>
              <Avatar className={classes.icon}><Settings /></Avatar>
            </Hidden>
          </div>
          <Typography variant="h4" className={classes.title} gutterBottom>Under maintenance</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Our website is under maintenance. We will be back shortly
          </Typography>
        </div>
      </div>
    );
  }
}

Maintenance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Maintenance);
