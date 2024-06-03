import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import AllInclusive from '@mui/icons-material/AllInclusive';
import Brightness5 from '@mui/icons-material/Brightness5';
import People from '@mui/icons-material/People';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import * as yup from 'yup';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import useStyles from './user-jss';
import { ContentDivider } from '../Divider';

// validation functions
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} />; // eslint-disable-line
});

function LoginForm() {
  const { classes, cx } = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
  const deco = useSelector((state) => state.ui.decoration);

  const formik = useFormik({
    initialValues: {
      email: 'john.doe@mail.com',
      password: '12345678',
    },
    validationSchema,
    onSubmit: async (values) => {
      await sleep(500);
      console.log('You submitted:' + JSON.stringify(values, null, 2));
      window.location.href = '/app';
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

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
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Create new account
            </Button>
          </div>
        )}
        <Typography variant="h4" className={classes.title} gutterBottom>
          Sign In
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Lorem ipsum dolor sit amet
        </Typography>
        <section className={classes.socmedLogin}>
          <div className={classes.btnArea}>
            <Button variant="outlined" size="small" className={classes.redBtn} type="button">
              <AllInclusive className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 1
            </Button>
            <Button variant="outlined" size="small" className={classes.blueBtn} type="button">
              <Brightness5 className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 2
            </Button>
            <Button variant="outlined" size="small" className={classes.cyanBtn} type="button">
              <People className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 3
            </Button>
          </div>
          <ContentDivider content="Or sign in with email" />
        </section>
        <section className={classes.formWrap}>
          <form onSubmit={formik.handleSubmit}>
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
                  label="Your Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  className={classes.field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          size="large">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </div>
            <div className={classes.optArea}>
              <FormControlLabel className={classes.label} control={<Checkbox name="checkbox" />} label="Remember" />
              <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>Forgot Password</Button>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" size="large" type="submit" disabled={formik.isSubmitting}>
                Continue
                <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </Fragment>
  );
}

export default LoginForm;
