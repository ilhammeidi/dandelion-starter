import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import styles from 'dan-components/Forms/user-jss';

class ComingSoon extends React.Component {
  state = {
    email: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const title = brand.name + ' - Coming Soon';
    const description = brand.desc;
    const { classes, deco } = this.props;
    const { email } = this.state;
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
                classNames(
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
                <div className={classNames(classes.notifyForm, classes.centerAdornment)}>
                  <FormControl>
                    <TextField
                      fullWidth
                      id="standard-name"
                      label="Email"
                      className={classes.textField}
                      value={email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                    />
                  </FormControl>
                  <aside>
                    <Button variant="contained" mini color="secondary" type="submit">
                      Notify me
                    </Button>
                  </aside>
                </div>
                <div className={classNames(classes.lockForm, classes.centerAdornment)}>
                  <IconButton color="primary" className={classes.button} href="#"><Ionicon icon="logo-facebook" /></IconButton>
                  <IconButton color="primary" className={classes.button} href="#"><Ionicon icon="logo-twitter" /></IconButton>
                  <IconButton color="primary" className={classes.button} href="#"><Ionicon icon="logo-github" /></IconButton>
                </div>
              </section>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

ComingSoon.propTypes = {
  classes: PropTypes.object.isRequired,
  deco: PropTypes.bool.isRequired,
};

const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(ComingSoon);

export default withStyles(styles)(FormInit);
