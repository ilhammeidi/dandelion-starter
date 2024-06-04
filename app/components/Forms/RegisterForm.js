import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AllInclusive from '@mui/icons-material/AllInclusive';
import Brightness5 from '@mui/icons-material/Brightness5';
import People from '@mui/icons-material/People';
import Icon from '@mui/material/Icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './user-jss';

// validation functions
const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  termsAndConditions: yup
    .bool()
    .oneOf([true])
});

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} />; // eslint-disable-line
});

function RegisterForm() {
  const { classes, cx } = useStyles();
  const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
  const deco = useSelector((state) => state.ui.decoration);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      termsAndConditions: false
    },
    validationSchema,
    onSubmit: async (values) => {
      await sleep(500);
      console.log('You submitted:' + JSON.stringify(values, null, 2));
      window.location.href = '/app';
    },
  });

  const [tab, setTab] = useState(0);

  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  return (
    <Fragment>
      {!mdUp && (
        <NavLink to="/" className={cx(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      )}
      <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
        {!mdDown && (
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have account ?
            </Button>
          </div>
        )}
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Lorem ipsum dolor sit amet
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="With Email" />
          <Tab label="With Social Media" />
        </Tabs>
        {tab === 0 && (
          <section className={classes.formWrap}>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <TextField
                    id="name"
                    name="name"
                    label="Username"
                    variant="standard"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <TextField
                    id="email"
                    name="email"
                    label="Your Email"
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Your Password"
                    variant="standard"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <TextField
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    label="Re-type Password"
                    variant="standard"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                    helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      id="termsAndConditions"
                      name="termsAndConditions"
                      checked={formik.values.check}
                      value={formik.values.check}
                      onChange={formik.handleChange}
                      className={classes.agree}
                      required
                    />
                  )}
                  label="Agree with"
                />
                <a href="#" className={classes.link}>Terms &amp; Condition</a>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
                  Continue
                  <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </div>
            </form>
          </section>
        )}
        {tab === 1 && (
          <section className={classes.socmedFull}>
            <Button fullWidth variant="outlined" size="large" className={classes.redBtn} type="button">
              <AllInclusive className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 1
            </Button>
            <Button fullWidth variant="outlined" size="large" className={classes.blueBtn} type="button">
              <Brightness5 className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 2
            </Button>
            <Button fullWidth variant="outlined" size="large" className={classes.cyanBtn} type="button">
              <People className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 3
            </Button>
          </section>
        )}
      </Paper>
    </Fragment>
  );
}

export default RegisterForm;
