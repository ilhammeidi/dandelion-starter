import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { ContentDivider } from '../Divider';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class LoginForm extends React.Component {
  state = {
    showPassword: false
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Fragment>
        <Hidden mdUp>
          <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </Hidden>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <Hidden smDown>
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
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Sign In
          </Typography>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            Lorem ipsum dolor sit amet
          </Typography>
          <section className={classes.socmedLogin}>
            <div className={classes.btnArea}>
              <Button variant="outlined" size="small" className={classes.redBtn} type="button">
                <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 1
              </Button>
              <Button variant="outlined" size="small" className={classes.blueBtn} type="button">
                <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 2
              </Button>
              <Button variant="outlined" size="small" className={classes.cyanBtn} type="button">
                <People className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 3
              </Button>
            </div>
            <ContentDivider content="Or sign in with email" />
          </section>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
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
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type={showPassword ? 'text' : 'password'}
                    label="Your Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    required
                    validate={required}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.optArea}>
                <FormControlLabel className={classes.label} control={<Field name="checkbox" component={CheckboxRedux} />} label="Remember" />
                <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>Forgot Password</Button>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" size="large" type="submit">
                  Continue
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(LoginForm);

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducerLogin, 'usersLogin']),
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(LoginFormReduxed);

export default withStyles(styles)(FormInit);
