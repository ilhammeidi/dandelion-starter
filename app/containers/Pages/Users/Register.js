import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

function Register(props) {
  const [valueForm, setValueForm] = useState(null);

  const submitForm = values => {
    setTimeout(() => {
      setValueForm(values);
      console.log(`You submitted:\n\n${valueForm}`);
      window.location.href = '/app';
    }, 500); // simulate server latency
  };

  const title = brand.name + ' - Register';
  const description = brand.desc;
  const { classes } = props;
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
        <div className={classes.userFormWrap}>
          <RegisterForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
