import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux } from './ReduxFormMUI';
import useStyles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function ResetForm(props) {
  const { classes, cx } = useStyles();
  const {
    handleSubmit,
    pristine,
    submitting,
    deco,
  } = props;
  return (
    <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
      <div className={classes.topBar}>
        <NavLink to="/" className={classes.brand}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
        Send reset password link to Your email
      </Typography>
      <section className={classes.formWrap}>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl variant="standard" className={classes.formControl}>
              <Field
                name="email"
                component={TextFieldRedux}
                placeholder="Your Email"
                label="Your Email"
                required
                validate={[required, email]}
                className={classes.field}
              />
            </FormControl>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
              Send Reset Link
              <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}

ResetForm.propTypes = {

  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'resetFrm',
  enableReinitialize: true,
})(ResetForm);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(ResetFormReduxed);

export default RegisterFormMapped;
