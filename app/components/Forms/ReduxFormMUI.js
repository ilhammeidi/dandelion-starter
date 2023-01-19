import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';

/* Textfield */
export const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => {
  const [val, setVal] = useState('');
  return (
    <TextField
      variant="standard"
      {...rest}
      {...input}
      value={val || input.value}
      onChange={(e) => setVal(e.target.value)}
      error={touched && Boolean(error)} />
  );
};

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
  <Select variant="standard" {...input} {...rest}>
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
