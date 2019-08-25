import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

/* Textfield */
export const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={touched && Boolean(error)}
    helperText={touched && error && error}
  />
);


TextFieldRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

TextFieldRedux.defaultProps = {
  meta: null,
};
/* End */

/* Select */
export const SelectRedux = ({ input, children, ...rest }) => (
  <Select
    {...input}
    {...rest}
  >
    {children}
  </Select>
);

SelectRedux.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
/* End */

/* Checkbox */
export const CheckboxRedux = ({ input, ...rest }) => (
  <Checkbox
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

CheckboxRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */

/* Switch */
export const SwitchRedux = ({ input, ...rest }) => (
  <Switch
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

SwitchRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */
