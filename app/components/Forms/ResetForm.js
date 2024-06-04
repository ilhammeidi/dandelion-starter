import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import useStyles from './user-jss';

// validation functions
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

function ResetForm() {
  const { classes, cx } = useStyles();

  const deco = useSelector((state) => state.ui.decoration);

  const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      await sleep(500);
      console.log(JSON.stringify(values, null, 2));
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormControl variant="standard" className={classes.formControl}>
              <TextField
                name="email"
                variant="standard"
                placeholder="Your Email"
                label="Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
              Send Reset Link
              <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}

export default ResetForm;
