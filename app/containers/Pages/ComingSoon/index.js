import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import useStyles from 'dan-components/Forms/user-jss';

function ComingSoon(props) {
  const { classes, cx } = useStyles();
  const { deco } = props;
  const [email, setEmail] = useState('');

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const title = brand.name + ' - Coming Soon';
  const description = brand.desc;
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.fullFormWrap}>
          <Paper
            className={
              cx(
                classes.fullWrap,
                deco && classes.petal,
                classes.centerV
              )
            }
          >
            <div className={classes.brandCenter}>
              <div className={classes.brand}>
                <img src={logo} alt={brand.name} />
                {brand.name}
              </div>
            </div>
            <Typography variant="h2" className={classes.titleGradient} gutterBottom>
              Coming Soon
            </Typography>
            <Typography variant="h5" gutterBottom align="center">
              Will come with performance in design
            </Typography>
            <section className={classes.pageFormWrap}>
              <div className={cx(classes.notifyForm, classes.centerAdornment)}>
                <FormControl variant="standard">
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Email"
                    className={classes.textField}
                    value={email}
                    onChange={handleChange}
                    margin="normal" />
                </FormControl>
                <aside>
                  <Button variant="contained" color="secondary" type="submit">
                    Notify me
                  </Button>
                </aside>
              </div>
              <div className={cx(classes.lockForm, classes.centerAdornment)}>
                <IconButton color="primary" className={classes.button} href="#" size="large"><i className="ion-logo-facebook" /></IconButton>
                <IconButton color="primary" className={classes.button} href="#" size="large"><i className="ion-logo-twitter" /></IconButton>
                <IconButton color="primary" className={classes.button} href="#" size="large"><i className="ion-logo-github" /></IconButton>
              </div>
            </section>
          </Paper>
        </div>
      </div>
    </div>
  );
}

ComingSoon.propTypes = {

  deco: PropTypes.bool.isRequired,
};

const FormInit = connect(
  state => ({
    ...state,
    deco: state.ui.decoration
  }),
)(ComingSoon);

export default FormInit;
