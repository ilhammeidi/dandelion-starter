import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { ResetForm } from 'dan-components';
import useStyles from '../../../components/Forms/user-jss';

function ResetPassword() {
  const { classes } = useStyles();

  const title = brand.name + ' - Reset Password';
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
          <ResetForm />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
