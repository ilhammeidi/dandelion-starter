import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import useStyles from 'dan-components/Forms/user-jss';

function Register() {
  const { classes } = useStyles();

  const title = brand.name + ' - Register';
  const description = brand.desc;

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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
