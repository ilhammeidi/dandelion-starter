import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import { Field, reduxForm } from 'redux-form';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  SwitchRedux
} from 'dan-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'dan-redux/actions/reduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
}));

const initData = {
  text: 'Sample Text',
  email: 'sample@mail.com',
  radio: 'option1',
  selection: 'option1',
  onof: true,
  checkbox: true,
  textarea: 'This is default text'
};

function ReduxFormDemo(props) {
  const { classes } = useStyles();
  const trueBool = true;
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    init,
    clear,
  } = props;
  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Simple Form Example
            </Typography>
            <Typography component="p">
              The delay between when you click (Submit) and when the alert dialog pops up is intentional, to simulate server latency.
            </Typography>
            <div className={classes.buttonInit}>
              <Button onClick={() => init(initData)} color="secondary" type="button">
                Load Sample Data
              </Button>
              <Button onClick={() => clear()} type="button">
                Clear Data
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="text"
                  component={TextFieldRedux}
                  placeholder="Text Field"
                  label="Text Field"
                  validate={required}
                  required
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder="Email Field"
                  label="Email"
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </div>
              <div className={classes.fieldBasic}>
                <FormLabel component="label">Choose One Option</FormLabel>
                <Field name="radio" className={classes.inlineWrap} component={renderRadioGroup}>
                  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                </Field>
              </div>
              <div>
                <FormControl variant="standard" className={classes.field}>
                  <InputLabel htmlFor="selection">Selection</InputLabel>
                  <Field
                    name="selection"
                    component={SelectRedux}
                    placeholder="Selection"
                    autoWidth={trueBool}
                  >
                    <MenuItem value="option1">Option One</MenuItem>
                    <MenuItem value="option2">Option Two</MenuItem>
                    <MenuItem value="option3">Option Three</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div className={classes.fieldBasic}>
                <FormLabel component="label">Toggle Input</FormLabel>
                <div className={classes.inlineWrap}>
                  <FormControlLabel control={<Field name="onof" component={SwitchRedux} />} label="On/OF Switch" />
                  <FormControlLabel control={<Field name="checkbox" component={CheckboxRedux} />} label="Checkbox" />
                </div>
              </div>
              <div className={classes.field}>
                <Field
                  name="textarea"
                  className={classes.field}
                  component={TextFieldRedux}
                  placeholder="Textarea"
                  label="Textarea"
                  multiline={trueBool}
                  rows={4}
                />
              </div>
              <div>
                <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                  Submit
                </Button>
                <Button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

ReduxFormDemo.propTypes = {

  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'reduxFormDemo',
  enableReinitialize: true,
})(ReduxFormDemo);

const FormInit = connect(
  state => ({
    initialValues: state.initval.formValues
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default FormInit;
