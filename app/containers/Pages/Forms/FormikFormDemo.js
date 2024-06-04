import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles()((theme) => ({
  form: {
    '& > div': {
      marginBottom: theme.spacing(2)
    }
  },
}));

function FormikForm() {
  const { classes } = useStyles();

  const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
  const defaultData = {
    name: '',
    email: '',
    password: '',
    select: 'option 1',
    option: 'option 1',
    switch: false,
    check: false,
    group: [],
    textarea: ''
  };
  const [sampleData, setSampleData] = useState(defaultData);

  const initData = () => {
    setSampleData({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345678',
      select: 'option 2',
      option: 'option 3',
      switch: true,
      check: true,
      group: ['option 1', 'option 3'],
      textarea: 'Just register to join with us. A platform with efficient integration of many features and so much more. Just register to join with us. A platform with efficient integration of many features and so much more. Just register to join with us. A platform with efficient integration of many features and so much more',
    });
  };

  const formik = useFormik({
    initialValues: sampleData,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      await sleep(500);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const clearData = () => {
    formik.resetForm({
      values: defaultData
    });
  };

  return (
    <Grid container spacing={3} alignItems="flex-start" direction="row" justifyContent="center">
      <Grid item xs={12} md={6}>
        <Button color="primary" onClick={initData}>Load Sample Data</Button>
        <Button onClick={clearData}>Clear Data</Button>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="standard"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            variant="standard"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            variant="standard"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControl fullWidth>
            <InputLabel variant="standard" id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="select"
              name="select"
              variant="standard"
              label="Select Option"
              value={formik.values.select}
              onChange={formik.handleChange}
            >
              <MenuItem value="option 1">Option 1</MenuItem>
              <MenuItem value="option 2">Option 2</MenuItem>
              <MenuItem value="option 3">Option 3</MenuItem>
            </Select>
          </FormControl>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  id="check"
                  name="check"
                  checked={formik.values.check}
                  onChange={formik.handleChange}
                />
              }
              label="Check"
            />
            <FormControlLabel
              control={
                <Switch
                  id="switch"
                  name="switch"
                  checked={formik.values.switch}
                  onChange={formik.handleChange}
                />
              }
              label="Switch ON/OFF"
            />
          </FormGroup>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={formik.values.option}
              onChange={formik.handleChange}
              id="option"
              name="option"
            >
              <FormControlLabel value="option 1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option 2" control={<Radio />} label="Option 2" />
              <FormControlLabel value="option 3" control={<Radio />} label="Option 3" />
              <FormControlLabel value="option 4" control={<Radio />} label="Option 4" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-check--group-label">Options</FormLabel>
            <FormGroup
              row
              aria-labelledby="demo-check--group-label"
            >
              <FormControlLabel value="option 1" checked={formik.values.group.indexOf('option 1') > -1} name="group" onChange={formik.handleChange} control={<Checkbox />} label="Option 1" />
              <FormControlLabel value="option 2" checked={formik.values.group.indexOf('option 2') > -1} name="group" onChange={formik.handleChange} control={<Checkbox />} label="Option 2" />
              <FormControlLabel value="option 3" checked={formik.values.group.indexOf('option 3') > -1} name="group" onChange={formik.handleChange} control={<Checkbox />} label="Option 3" />
              <FormControlLabel value="option 4" checked={formik.values.group.indexOf('option 4') > -1} name="group" onChange={formik.handleChange} control={<Checkbox />} label="Option 4" />
            </FormGroup>
          </FormControl>
          <TextField
            fullWidth
            multiline
            variant="standard"
            rows={4}
            id="textarea"
            name="textarea"
            label="Textarea"
            value={formik.values.textarea}
            onChange={formik.handleChange}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default FormikForm;
